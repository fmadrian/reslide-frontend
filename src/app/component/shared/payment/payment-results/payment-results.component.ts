import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaymentPayload } from 'src/app/payload/payment/payment.payload';
import { DateService } from 'src/app/service/date/date.service';
import { NumberService } from 'src/app/service/number/number.service';
import { PaymentService } from 'src/app/service/payment/payment.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { AppRoutes } from 'src/app/utils/appRoutes';
import { TotalsInformation } from 'src/app/utils/totals-information';

@Component({
  selector: 'app-payment-results',
  templateUrl: './payment-results.component.html',
  styleUrls: ['./payment-results.component.scss'],
})
export class PaymentResultsComponent implements OnInit, OnChanges {
  // Individual table
  displayedColumns = [
    'externalId', // ID of the invoice / order that is related to the transaction that this payment belongs to.
    'date',
    'paymentMethod',
    //'owedAfter',
    //'owedBefore',
    'paid',
    'status',
    'username',
    'overturnButton',
    'notes',
  ];
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<PaymentPayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row
  paymentSelected: PaymentPayload | null;
  // GUI flag
  isLoading = false;
  // Input
  @Input() paymentResultsInput: PaymentPayload[] = [];
  @Input() transactionId: number | undefined;
  @Input() showButton = true;
  @Input() title = 'Payments';
  @Input() printTitle = ''; // String used to represent the date range of a search
  @Input() showPrintButton = false; // Indicates if we're trying to access the component from the search payments page.
  @Input() useDetailsCSSClasses = true; // Changes the CSS classes used when displaying payments.
  // Totals information
  totals: TotalsInformation[] = []; // Shows the total (paid) of all the payments displayed.
  // Output
  @Output() paymentResultsOutput = new EventEmitter<PaymentPayload[]>();
  @Output() refreshTransaction = new EventEmitter<void>();
  AppRoutes = AppRoutes;
  constructor(
    private paymentService: PaymentService,
    private snackbarService: SnackbarService,
    private dateService: DateService,
    private numberService: NumberService
  ) {
    this.datasource = new MatTableDataSource();
    this.paymentSelected = null;
    this.showButton = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.reloadDatasource();
  }
  ngOnInit() {
    this.reloadDatasource();
  }
  selectPayment(payment: PaymentPayload) {}
  overturn(payment: PaymentPayload) {
    if (this.transactionId) {
      // Adds the transaction id and then, overturns the payment.
      // Tells the parent component to refresh.
      payment = { ...payment, transactionId: this.transactionId };
      this.paymentService.overturn(payment).subscribe(
        () => {
          this.refreshTransaction.next();
        },
        (error) => {
          this.snackbarService.show(error);
        }
      );
    } else {
      // Eliminates the element from the array and sends it back to the parent component.
      let index = this.paymentResultsInput.indexOf(payment);
      this.paymentResultsOutput.next([
        ...this.paymentResultsInput.slice(0, index),
        ...this.paymentResultsInput.slice(
          index + 1,
          this.paymentResultsInput.length
        ),
      ]);
    }
  }
  switchState(payment: PaymentPayload) {}
  reloadDatasource() {
    this.datasource = new MatTableDataSource(this.paymentResultsInput);
    this.datasource.sort = this.sort;
    this.getTotals();
  }

  getDate(date: string) {
    return this.dateService.getLocaleString(date);
  }
  getTotals() {
    this.totals = [
      {
        name: 'Total',
        value: this.numberService.addAll(
          this.paymentResultsInput.map((payment) => payment.paid)
        ),
      },
    ];
  }
}
