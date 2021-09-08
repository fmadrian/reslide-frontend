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
import { InvoicePayload } from 'src/app/payload/invoice/invoice.payload';
import { DateService } from 'src/app/service/date/date.service';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-invoice-results',
  templateUrl: './invoice-results.component.html',
  styleUrls: ['./invoice-results.component.scss'],
})
export class InvoiceResultsComponent implements OnInit {
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
    'username',
    'button',
  ]; // id will be hidden.
  // Dataset created to manipulate the data in the table.
  datasource: MatTableDataSource<InvoicePayload>;
  // Sort
  @ViewChild(MatSort) sort: MatSort | null = null;
  // Selected row
  invoiceSelected: InvoicePayload | null;
  // Output
  @Output() componentOutput = new EventEmitter<InvoicePayload[]>();
  // GUI flag
  isLoading = true;
  @Input() showUpdateButton: boolean;
  // Dialog
  dialogRef: MatDialogRef<InvoiceResultsComponent> | null;
  constructor(
    public injector: Injector,
    private router: Router,
    private invoiceService: InvoiceService,
    private formBuilder: FormBuilder,
    private dateService: DateService
  ) {
    this.searchForm = this.formBuilder.group({});
    this.datasource = new MatTableDataSource();
    this.invoiceSelected = null;
    this.showUpdateButton = false;
    // Tries to inject a dialog reference (if it doesn't exist, it returns null)
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      code: [''],
      start: [new Date(), Validators.required],
      end: [new Date(), Validators.required],
    });
    const start = this.searchForm.get('start')?.value;
    const end = this.searchForm.get('end')?.value;
    this.invoiceService.search(start, end).subscribe(
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
  loadDataSource(data: InvoicePayload[]) {
    this.datasource = new MatTableDataSource(data);
  }
  selectInvoice(row: InvoicePayload) {
    if (this.invoiceSelected && this.invoiceSelected === row) {
      this.invoiceSelected = null;
    } else {
      this.invoiceSelected = row;
    }
  }
  search() {
    const code = this.searchForm.get('code')?.value;
    const start = this.dateService.getISOString(
      this.searchForm.get('start')?.value
    );
    const end = this.dateService.getISOString(
      this.searchForm.get('end')?.value
    );
    this.isLoading = true;
    this.invoiceService.search(start, end).subscribe(
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
  update(invoice: InvoicePayload) {
    if (invoice?.id !== null && invoice?.id !== undefined) {
      this.router.navigateByUrl(AppRoutes.invoice.update_id(invoice.id));
    }
  }
  closeDialog(type: InvoicePayload | null = null) {
    if (this.dialogRef !== null) {
      // Closes the dialog and sends the invoice selected to whoever called the dialog.
      this.dialogRef?.close(type);
    }
  }
}
