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
    'status',
    'deleteButton',
  ];
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<InvoiceDetailPayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row
  detailSelected: InvoiceDetailPayload | null;
  // GUI flag
  isLoading = false;
  @Input() showUpdateButton: boolean;
  // Input
  @Input() invoiceDetailsInput: InvoiceDetailPayload[] = [];
  // Output
  @Output() invoiceDetailsOutput = new EventEmitter<InvoiceDetailPayload[]>();
  constructor(private router: Router) {
    this.datasource = new MatTableDataSource();
    this.detailSelected = null;
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
  selectDetail(detail: InvoiceDetailPayload) {}
  delete(detail: InvoiceDetailPayload) {
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
  switchState(detail: InvoiceDetailPayload) {}
  reloadDatasource() {
    this.datasource = new MatTableDataSource(this.invoiceDetailsInput);
    this.datasource.sort = this.sort;
  }
}
