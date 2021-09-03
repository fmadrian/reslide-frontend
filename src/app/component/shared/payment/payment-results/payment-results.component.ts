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
  @Input() showUpdateButton: boolean;
  // Input
  @Input() paymentResultsInput: PaymentPayload[] = [];
  @Input() transactionId: number | undefined;
  // Output
  @Output() paymentResultsOutput = new EventEmitter<PaymentPayload[]>();
  @Output() refreshInvoice = new EventEmitter<void>();
  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private snackbarService: SnackbarService
  ) {
    this.datasource = new MatTableDataSource();
    this.paymentSelected = null;
    this.showUpdateButton = false;

    if (this.showUpdateButton) {
      // Displays the switch state button column
      this.displayedColumns.push('switchButton');
    }
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
      // Adds the transaction id an
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
}
