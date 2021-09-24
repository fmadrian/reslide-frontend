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
import { PaymentService } from 'src/app/service/payment/payment.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-payment-results',
  templateUrl: './payment-results.component.html',
  styleUrls: ['./payment-results.component.scss'],
})
export class PaymentResultsComponent implements OnInit, OnChanges {
  // Individual table
  displayedColumns = [
    'date',
    'notes',
    'owedAfter',
    'owedBefore',
    'paid',
    'paymentMethod',
    'status',
    'username',
    'overturnButton',
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
  // Output
  @Output() paymentResultsOutput = new EventEmitter<PaymentPayload[]>();
  @Output() refreshInvoice = new EventEmitter<void>();
  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private snackbarService: SnackbarService,
    private dateService: DateService
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
      payment = { ...payment, transactionId: this.transactionId };
      this.paymentService.overturn(payment).subscribe(
        () => {
          this.refreshInvoice.next();
        },
        (error) => {
          this.snackbarService.show(error.message);
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
  }

  getDate(date: string) {
    return this.dateService.getLocaleString(date);
  }
}
