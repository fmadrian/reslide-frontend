import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InvoicePayload } from 'src/app/payload/invoice/invoice.payload';
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
    private formBuilder: FormBuilder
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
      query: [''],
    });
    this.invoiceService
      // TODO: Incorporate actual date components
      .search('2016-10-20T00:00:00.00Z', '2022-10-20T00:00:00.00Z')
      .subscribe(
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
    let query = this.searchForm.get('query')?.value;
    this.isLoading = true;
    this.invoiceService
      // TODO: Incorporate actual date components
      .search('2016-10-20T00:00:00.00Z', '2022-10-20T00:00:00.00Z')
      .subscribe(
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
