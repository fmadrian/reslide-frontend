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
import { OrderDetailPayload } from 'src/app/payload/orderDetail/order-detail.payload';
import { OrderDetailService } from 'src/app/service/orderDetail/order-detail.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-order-detail-results',
  templateUrl: './order-detail-results.component.html',
  styleUrls: ['./order-detail-results.component.scss'],
})
export class OrderDetailResultsComponent implements OnInit {
  // Individual table
  displayedColumns = [
    'productCode',
    'productName',
    'priceByUnit',
    'quantity',
    'total',
    'status',
    'deleteButton',
    'switchButton',
    'notes',
  ];
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<OrderDetailPayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // GUI flag
  isLoading = false;
  // Input
  @Input() orderDetailsInput: OrderDetailPayload[] = [];
  @Input() orderId: number | null = null;
  @Input() showButton = true; // Determines if we should show the delete button
  // Output
  @Output() orderDetailsOutput = new EventEmitter<OrderDetailPayload[]>();
  @Output() refreshOrder = new EventEmitter<void>();
  constructor(
    private orderDetailService: OrderDetailService,
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
  switch(detail: OrderDetailPayload) {
    if (detail.id && this.orderId) {
      // Add the order id to the detail and then do the switch
      detail.orderId = this.orderId;
      this.orderDetailService.switchStatus(detail).subscribe(
        (response) => {
          this.refreshOrder.next();
        },
        (error) => {
          this.snackbarService.show(error.message);
        }
      );
    }
  }
  delete(detail: OrderDetailPayload) {
    // If we are updating an order, and we want to delete a line, we must do it by doing an API to delete
    // the line, then asking the parent component to refresh the order.
    if (detail.id && this.orderId) {
      this.orderDetailService.delete(this.orderId, detail.id).subscribe(
        (response) => {
          this.snackbarService.show(response.message);
          this.refreshOrder.next();
        },
        (error) => {
          this.snackbarService.show(error);
        }
      );
    } else {
      // Eliminates the element from the array and sends it back to the parent component.
      let index = this.orderDetailsInput.indexOf(detail);
      this.orderDetailsOutput.next([
        ...this.orderDetailsInput.slice(0, index),
        ...this.orderDetailsInput.slice(
          index + 1,
          this.orderDetailsInput.length
        ),
      ]);
    }
  }
  reloadDatasource() {
    this.datasource = new MatTableDataSource(this.orderDetailsInput);
    this.datasource.sort = this.sort;
  }
}
