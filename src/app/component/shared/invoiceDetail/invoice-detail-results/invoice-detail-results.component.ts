import {
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
import { InvoiceDetailPayload } from 'src/app/payload/invoiceDetail/invoice-detail.payload';
import { InvoiceDetailService } from 'src/app/service/invoiceDetail/invoice-detail.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
@Component({
  selector: 'app-invoice-detail-results',
  templateUrl: './invoice-detail-results.component.html',
  styleUrls: ['./invoice-detail-results.component.scss'],
})
export class InvoiceDetailResultsComponent implements OnInit, OnChanges {
  // Individual table
  displayedColumns = [
    'productCode',
    'productName',
    'priceByUnit',
    'quantity',
    'subtotal',
    'tax',
    'discount',
    'total',
    'deleteButton',
  ];
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<InvoiceDetailPayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // GUI flag
  isLoading = false;
  // Input
  @Input() invoiceDetailsInput: InvoiceDetailPayload[] = [];
  @Input() invoiceId: number | null = null;
  @Input() showButton = true; // Determines if we should show the delete button
  // Output
  @Output() invoiceDetailsOutput = new EventEmitter<InvoiceDetailPayload[]>();
  @Output() refreshInvoice = new EventEmitter<void>();
  constructor(
    private router: Router,
    private invoiceDetailService: InvoiceDetailService,
    private snackbarService: SnackbarService
  ) {
    this.datasource = new MatTableDataSource();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.reloadDatasource();
  }
  ngOnInit() {
    this.reloadDatasource();
  }
  delete(detail: InvoiceDetailPayload) {
    // If we are updating an invoice, and we want to delete a line, we must do it by doing an API to delete
    // the line, then asking the parent component to refresh the invoice.
    if (detail.id && this.invoiceId) {
      this.invoiceDetailService.delete(this.invoiceId, detail.id).subscribe(
        (response) => {
          this.snackbarService.show(response.message);
          this.refreshInvoice.next();
        },
        (error) => {
          this.snackbarService.show(error.message);
        }
      );
    } else {
      // Eliminates the element from the array and sends it back to the parent component.
      let index = this.invoiceDetailsInput.indexOf(detail);
      this.invoiceDetailsOutput.next([
        ...this.invoiceDetailsInput.slice(0, index),
        ...this.invoiceDetailsInput.slice(
          index + 1,
          this.invoiceDetailsInput.length
        ),
      ]);
    }
  }
  reloadDatasource() {
    this.datasource = new MatTableDataSource(this.invoiceDetailsInput);
    this.datasource.sort = this.sort;
  }
}
