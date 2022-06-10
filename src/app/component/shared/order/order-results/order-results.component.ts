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
import { NumberService } from 'src/app/service/number/number.service';
import { OrderService } from 'src/app/service/order/order.service';
import { AppRoutes } from 'src/app/utils/appRoutes';
import { TotalsInformation } from 'src/app/utils/totals-information';

@Component({
  selector: 'app-order-results',
  templateUrl: './order-results.component.html',
  styleUrls: ['./order-results.component.scss'],
})
export class OrderResultsComponent implements OnInit {
  title = 'Orders';
  // Search form
  searchForm: FormGroup;
  // order table
  displayedColumns = [
    'id',
    'date',
    'expectedDate',
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
  orderDate: DateRange = {
    start: this.dateService.setTimeTo(new Date(), 'start'),
    end: this.dateService.setTimeTo(new Date(), 'end'),
  };
  expectedDate: DateRange | null = null;
  actualDate: DateRange | null = null;
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
  // Totals
  totals: TotalsInformation[] = [];
  constructor(
    public injector: Injector,
    private router: Router,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private individualService: IndividualService,
    private dialogService: DialogService,
    private numberService: NumberService
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
    this.search();
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
    const start_date = this.dateService.getISOString(this.orderDate.start);
    const end_date = this.dateService.getISOString(this.orderDate.end);
    const start_expected_delivery_date = this.expectedDate
      ? this.dateService.getISOString(this.expectedDate.start)
      : null;
    const end_expected_delivery_date = this.expectedDate
      ? this.dateService.getISOString(this.expectedDate.end)
      : null;
    const start_actual_delivery_date = this.actualDate
      ? this.dateService.getISOString(this.actualDate.start)
      : null;
    const end_actual_delivery_date = this.actualDate
      ? this.dateService.getISOString(this.actualDate.end)
      : null;

    this.isLoading = true;
    this.totals = [];
    this.orderService
      .search(
        start_date,
        end_date,
        code,
        start_expected_delivery_date,
        end_expected_delivery_date,
        start_actual_delivery_date,
        end_actual_delivery_date
      )
      .subscribe(
        (data) => {
          this.loadDataSource(data);
          this.totals = this.orderService.getTotals(data);
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

  receiveDate(range: DateRange | null, date: string) {
    // The only range that can't receive null ranges is the order date.
    if (range) {
      if (date === 'order') {
        this.orderDate = range;
      }
    }

    if (date === 'expected') {
      this.expectedDate = range;
    } else if (date === 'actual') {
      this.actualDate = range;
    }
  }
}
