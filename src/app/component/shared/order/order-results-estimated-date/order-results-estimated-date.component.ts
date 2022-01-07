import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderPayload } from 'src/app/payload/order/order.payload';
import { DateService } from 'src/app/service/date/date.service';
import { OrderService } from 'src/app/service/order/order.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-order-results-estimated-date',
  templateUrl: './order-results-estimated-date.component.html',
  styleUrls: ['./order-results-estimated-date.component.scss'],
})
export class OrderResultsEstimatedDateComponent
  implements OnInit, AfterViewInit
{
  AppRoutes = AppRoutes;
  title = 'Orders about to arrive';
  isOpen = false;
  isLoading = false;
  error = '';
  orders: OrderPayload[] = [];
  form = this.formBuilder.group({});
  displayedColumns = [
    'id',
    'date',
    'providerCode',
    'providerName',
    'total',
    'paid',
    'owed',
    'username',
    'viewButton',
  ];
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<OrderPayload> = new MatTableDataSource();
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private dateService: DateService
  ) {}
  ngAfterViewInit(): void {
    this.loadDataSource();
  }

  ngOnInit(): void {
    const defaultDate = new Date();
    defaultDate.setHours(0, 0, 0);
    this.form = this.formBuilder.group({
      estimatedDeliveryDate: [defaultDate, Validators.required],
    });
    this.search();
  }
  switchContent() {
    this.isOpen = !this.isOpen;
  }
  search() {
    this.isLoading = true;
    this.error = '';
    const afterDate = this.dateService.getISOString(
      this.form.get('estimatedDeliveryDate')?.value
    );
    this.orderService.searchAfterEstimatedDate(afterDate).subscribe(
      (data) => {
        this.orders = data;
        this.loadDataSource();
      },
      (error) => {
        this.error = "We couldn't fetch the data.";
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  loadDataSource() {
    this.datasource = new MatTableDataSource(this.orders);
    this.datasource.sort = this.sort;
  }
  getDate(date: string) {
    return this.dateService.getLocaleString(date);
  }
}
