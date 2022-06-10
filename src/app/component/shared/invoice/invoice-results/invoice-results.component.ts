import {
  AfterViewInit,
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
import { InvoicePayload } from 'src/app/payload/invoice/invoice.payload';
import { DateService } from 'src/app/service/date/date.service';
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { IndividualService } from 'src/app/service/individual/individual.service';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';
import { NumberService } from 'src/app/service/number/number.service';
import { AppRoutes } from 'src/app/utils/appRoutes';
import { TotalsInformation } from 'src/app/utils/totals-information';

@Component({
  selector: 'app-invoice-results',
  templateUrl: './invoice-results.component.html',
  styleUrls: ['./invoice-results.component.scss'],
})
export class InvoiceResultsComponent implements OnInit, AfterViewInit {
  title = 'Invoices';
  // Search form
  searchForm: FormGroup;
  // invoice table
  displayedColumns = [
    'id',
    'date',
    'clientCode',
    'clientName',
    'subtotal',
    'tax',
    'discount',
    'total',
    'paid',
    'owed',
    'username',
    'updateButton',
    'viewButton',
  ];
  // Autocomplete bar
  clients$: undefined | Observable<IndividualPayload[]>;
  client: IndividualPayload | null = null;
  // Date
  @Input() dateRange: DateRange = {
    start: this.dateService.setTimeTo(new Date(), 'start'),
    end: this.dateService.setTimeTo(new Date(), 'end'),
  };
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<InvoicePayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row
  invoiceSelected: InvoicePayload | null;
  // Output
  @Output() componentOutput = new EventEmitter<InvoicePayload[]>();
  totals: TotalsInformation[] = [];
  // GUI flag
  isLoading = true;
  @Input() showUpdateButton: boolean;
  // Dialog
  dialogRef: MatDialogRef<InvoiceResultsComponent> | null;
  // App routes (we need to do this, so we can use them in the html section of the component.)
  AppRoutes = AppRoutes;
  constructor(
    public injector: Injector,
    private router: Router,
    private invoiceService: InvoiceService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private individualService: IndividualService,
    private dialogService: DialogService,
    private numberService: NumberService
  ) {
    this.searchForm = this.formBuilder.group({});
    this.datasource = new MatTableDataSource();
    this.invoiceSelected = null;
    this.showUpdateButton = false;
    // Tries to inject a dialog reference (if it doesn't exist, it returns null)
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }
  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      clientAutocomplete: [''],
    });
    this.search();

    this.clients$ = this.searchForm
      .get('clientAutocomplete')
      ?.valueChanges.pipe(
        switchMap(() => {
          let query = this.searchForm.get('clientAutocomplete')?.value;
          return this.individualService.search(query);
        }),
        catchError(() => {
          this.router.navigateByUrl(AppRoutes.error.internal); // Redirects the user.
          return of([]); // Returns empty observable with empty array.
        })
      );
  }
  loadDataSource(data: InvoicePayload[]) {
    this.datasource = new MatTableDataSource(data);
    this.datasource.sort = this.sort;
  }
  selectInvoice(row: InvoicePayload) {
    if (this.invoiceSelected && this.invoiceSelected === row) {
      this.invoiceSelected = null;
    } else {
      this.invoiceSelected = row;
    }
  }
  search() {
    // Get code from the client selected or send an empty string
    const code = this.client ? this.client.code : '';
    const start = this.dateService.getISOString(this.dateRange.start);
    const end = this.dateService.getISOString(this.dateRange.end);
    this.isLoading = true;
    this.totals = [];
    this.invoiceService.search(start, end, code).subscribe(
      (data) => {
        this.loadDataSource(data);
        this.totals = this.invoiceService.getTotals(data);
        // Updates the URL with the dates introduced.
        this.router.navigate([], { queryParams: { start, end } });
      },
      () => {
        this.router.navigateByUrl(AppRoutes.error.internal);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  closeDialog(type: InvoicePayload | null = null) {
    if (this.dialogRef !== null) {
      // Closes the dialog and sends the invoice selected to whoever called the dialog.
      this.dialogRef?.close(type);
    }
  }
  /**
   * Changes the selected client.
   */
  changeClient(client: IndividualPayload | null) {
    if (client) {
      this.client = client;
      this.searchForm
        .get('clientAutocomplete')
        ?.setValue(`${this.client?.code} ${this.client?.name}`);
    }
  }
  getDate(date: string) {
    return this.dateService.getLocaleString(date);
  }
  openDialog(name: string) {
    let dialog = this.dialogService.open(name);
    if (dialog !== null) {
      dialog.subscribe((data) => {
        this.changeClient(data);
      });
    }
  }
  // Receives date from the date range component
  receiveDate(range: DateRange | null) {
    if (range) {
      this.dateRange = range;
    }
  }
}
