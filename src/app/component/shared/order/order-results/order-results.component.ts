import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { DateRange } from 'src/app/payload/dateRange/date-range.interface';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { OrderPayload } from 'src/app/payload/order/order.payload';
import { DateService } from 'src/app/service/date/date.service';
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { IndividualService } from 'src/app/service/individual/individual.service';
import { OrderService } from 'src/app/service/order/order.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-order-results',
  templateUrl: './order-results.component.html',
  styleUrls: ['./order-results.component.scss'],
})
export class OrderResultsComponent implements OnInit {
  // Search form
  searchForm: FormGroup;
  // order table
  displayedColumns = [
    'id',
    'date',
    'providerCode',
    'providerName',
    'total',
    'paid',
    'owed',
    'username',
    'updateButton',
    'viewButton',
  ];
  // Autocomplete bar
  providers$: undefined | Observable<IndividualPayload[]>;
  provider: IndividualPayload | null = null;
  // Date ranges
  orderDate: DateRange = { start: new Date(), end: new Date() };
  estimatedDate: DateRange = { start: new Date(), end: new Date() };
  actualDate: DateRange = { start: new Date(), end: new Date() };
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<OrderPayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row
  orderSelected: OrderPayload | null;
  // Output
  @Output() componentOutput = new EventEmitter<OrderPayload[]>();
  // GUI flag
  isLoading = true;
  @Input() showUpdateButton: boolean;
  // Dialog
  dialogRef: MatDialogRef<OrderResultsComponent> | null;
  // App routes (we need to do this, so we can use them in the html section of the component.)
  AppRoutes = AppRoutes;
  constructor(
    public injector: Injector,
    private router: Router,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private individualService: IndividualService,
    private dialogService: DialogService
  ) {
    this.searchForm = this.formBuilder.group({});
    this.datasource = new MatTableDataSource();
    this.orderSelected = null;
    this.showUpdateButton = false;
    // Tries to inject a dialog reference (if it doesn't exist, it returns null)
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }
  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      providerAutocomplete: [''],
    });
    // Get the dates and convert them to ISO string to use them in the API call.
    const start = this.dateService.getISOString(this.orderDate.start);
    const end = this.dateService.getISOString(this.orderDate.end);
    this.orderService.search(start, end).subscribe(
      (data) => {
        this.loadDataSource(data);
      },
      () => {
        this.router.navigateByUrl(AppRoutes.error.internal);
      },
      () => {
        this.isLoading = false;
      }
    );
    this.providers$ = this.searchForm
      .get('providerAutocomplete')
      ?.valueChanges.pipe(
        switchMap(() => {
          let query = this.searchForm.get('providerAutocomplete')?.value;
          return this.individualService.search(query);
        }),
        catchError(() => {
          this.router.navigateByUrl(AppRoutes.error.internal); // Redirects the user.
          return of([]); // Returns empty observable with empty array.
        })
      );
  }
  loadDataSource(data: OrderPayload[]) {
    this.datasource = new MatTableDataSource(data);
    this.datasource.sort = this.sort;
  }
  selectOrder(row: OrderPayload) {
    if (this.orderSelected && this.orderSelected === row) {
      this.orderSelected = null;
    } else {
      this.orderSelected = row;
    }
  }
  search() {
    // Get code from the provider selected or send an empty string
    const code = this.provider ? this.provider.code : '';
    const start = this.dateService.getISOString(this.orderDate.start);
    const end = this.dateService.getISOString(this.orderDate.end);
    this.isLoading = true;
    this.orderService.search(start, end, code).subscribe(
      (data) => {
        this.loadDataSource(data);
      },
      () => {
        this.router.navigateByUrl(AppRoutes.error.internal);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  update(order: OrderPayload) {
    if (order?.id !== null && order?.id !== undefined) {
      this.router.navigateByUrl(AppRoutes.order.update_id(order.id));
    }
  }
  view(order: OrderPayload) {
    if (order.id !== null && order.id !== undefined) {
      this.router.navigateByUrl(AppRoutes.order.view_id(order.id));
    }
  }
  closeDialog(type: OrderPayload | null = null) {
    if (this.dialogRef !== null) {
      // Closes the dialog and sends the order selected to whoever called the dialog.
      this.dialogRef?.close(type);
    }
  }
  /**
   * Changes the selected provider.
   */
  changeProvider(provider: IndividualPayload | null) {
    if (provider) {
      this.provider = provider;
      this.searchForm
        .get('providerAutocomplete')
        ?.setValue(`${this.provider?.code} ${this.provider?.name}`);
    }
  }
  getDate(date: string) {
    return this.dateService.getLocaleString(date);
  }
  openDialog(name: string) {
    let dialog = this.dialogService.open(name);
    if (dialog !== null) {
      dialog.subscribe((data) => {
        this.changeProvider(data);
      });
    }
  }

  receiveDate(dateRange: DateRange, date: string) {
    if (date === 'order') {
      this.orderDate = {
        ...dateRange,
      };
    } else if (date === 'estimated') {
      this.estimatedDate = {
        ...dateRange,
      };
    } else if (date === 'actual') {
      this.actualDate = {
        ...dateRange,
      };
    }
  }
}
