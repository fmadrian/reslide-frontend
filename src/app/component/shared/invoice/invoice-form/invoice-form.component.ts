import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of, pipe, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { InvoicePayload } from 'src/app/payload/invoice/invoice.payload';
import { InvoiceDetailPayload } from 'src/app/payload/invoiceDetail/invoice-detail.payload';
import { PaymentPayload } from 'src/app/payload/payment/payment.payload';
import { DateService } from 'src/app/service/date/date.service';
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { IndividualService } from 'src/app/service/individual/individual.service';
import { InvoiceService } from 'src/app/service/invoice/invoice.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit, OnChanges {
  // Form
  invoiceForm: FormGroup;
  // Autocomplete bar
  clients$: undefined | Observable<IndividualPayload[]>;
  // Output
  @Output() invoiceOutput = new EventEmitter<InvoicePayload>();
  @Output() refreshInvoice = new EventEmitter<void>();
  // Input
  @Input() apiError: any | null = null;
  @Input() invoiceInput: InvoicePayload | null = null;
  // Invoice information
  client: IndividualPayload | null = null;
  invoice: InvoicePayload;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private individualService: IndividualService,
    private router: Router,
    private invoiceService: InvoiceService,
    private dialogService: DialogService,
    private dateService: DateService
  ) {
    this.invoiceForm = this.formBuilder.group({});
    this.clients$ = new Observable<IndividualPayload[]>();
    this.invoice = this.resetInvoice();
  }

  ngOnInit() {
    this.invoiceForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      clientAutocomplete: ['', Validators.required],
      notes: [''],
    });
    this.getInvoicePreview();

    // Chain 2 or more methods applied to same observable with pipe
    // 1st function: switchMap will switch from one observable to the other.
    // 2nd function: catchError will catch a error thrown by the observable and return a new observable or error.
    // Chain 2 observables with switchMap.
    // 1st observable: Observes if the value changes in the clientAutocomplete autocomplete bar.
    // 2nd observable: Does the query.
    this.clients$ = this.invoiceForm
      .get('clientAutocomplete')
      ?.valueChanges.pipe(
        switchMap(() => {
          let query = this.invoiceForm.get('clientAutocomplete')?.value;
          // Avoid making empty queries.
          if (query !== null || query === '') {
            return this.individualService.search(query);
          } else {
            return of([]);
          }
        }),
        catchError(() => {
          this.router.navigateByUrl(AppRoutes.error.internal); // Redirects the user.
          return of([]); // Returns empty observable with empty array.
        })
      );
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Resets the form if receives a new input or if there isn't an API error after creating a form.
    if (this.invoiceInput) {
      this.resetForm();
    } else {
      // If we receive a value (update), it has to pass into the other child components.
      this.getInvoicePreview();
    }
  }
  /**
   * Changes the selected client.
   */
  changeClient(client: IndividualPayload | null) {
    if (client) {
      this.client = client;
      this.invoiceForm
        .get('clientAutocomplete')
        ?.setValue(`${this.client?.code} ${this.client?.name}`);
      this.invoice = {
        ...this.invoice,
        clientName: this.client.name,
        clientCode: this.client.code,
      };
    }
  }
  openDialog(name: string) {
    let dialog = this.dialogService.open(name);
    if (dialog !== null) {
      dialog.subscribe((data) => {
        this.changeClient(data);
      });
    }
  }
  /**
   * Receives the refresh invoice signal from a child component and propagates it back to its parent component
   */
  getRefreshInvoice() {
    this.refreshInvoice.next();
  }
  /**
   * Only used when creating an invoice.
   * Receives a single detail from the form and adds it to the details array.
   * */
  receiveDetail(detail: InvoiceDetailPayload) {
    // If we use push function, the array is not changing therefore, the child components won't be able to detect new values.
    // We have to spread the array and add the new value.
    this.invoice.details = [...this.invoice.details, detail];
    this.getInvoicePreview();
  }
  /**
   * Only used when creating an invoice.
   * Receives multiple details from the results component.
   * It's used when we delete a detail and want to propagate the new details array.
   * */
  receiveDetails(details: InvoiceDetailPayload[]) {
    this.invoice.details = [...details];
    this.getInvoicePreview();
  }
  /**
   * Only used when creating an invoice.
   * Receives a single payment from the form and adds it to the payments array.
   * */
  receivePayment(payment: PaymentPayload) {
    this.invoice.transaction.payments = [
      ...this.invoice.transaction.payments,
      payment,
    ];
    this.getInvoicePreview();
  }
  /**
   * Only used when creating an invoice.
   * Receives multiple payments from the results component.
   * It's used when we delete a detail and want to propagate the new payments array.
   * */
  receivePayments(payments: PaymentPayload[]) {
    this.invoice.transaction.payments = [...payments];
    this.getInvoicePreview();
  }

  resetForm() {
    // Resets the invoice and the form values.
    this.invoiceForm.reset();
    this.invoice = this.resetInvoice();
    this.invoiceForm
      .get('date')
      ?.setValue(this.dateService.getDate(this.invoice.transaction.date));
    this.invoiceForm.get('notes')?.setValue(this.invoice.transaction.notes);
  }
  resetInvoice() {
    // If we are updating an invoice, we reload the values received.
    if (!this.invoiceInput) {
      // No input, no client
      this.changeClient(null);
    } else {
      // Build the client from the information received from the invoice
      const client: IndividualPayload = {
        name: this.invoiceInput.clientName,
        code: this.invoiceInput.clientCode,
        addresses: [],
        contacts: [],
        notes: '',
      };
      this.changeClient(client);
    }
    this.apiError = null;
    return this.invoiceService.resetInvoice(this.invoiceInput);
  }
  /**
   * Submits an invoice to its parent component.
   */
  submit() {
    if (
      this.invoiceForm.valid &&
      this.invoice.details.length > 0 &&
      this.invoice &&
      this.client
    ) {
      // If we are updating the invoice, we change the date and notes of the existent invoice.
      if (this.invoice.id) {
        this.invoice.transaction.date = this.dateService.getISOString(
          this.invoiceForm.get('date')?.value
        );
        this.invoice.transaction.notes = this.invoiceForm.get('notes')?.value;
      } else {
        // When are creating an invoice, we get update the last preview of the invoice.
        this.getInvoicePreview();
      }
      // We send it to the parent component
      this.invoiceOutput.next(this.invoice);
    }
  }
  getInvoicePreview() {
    this.invoice = this.invoiceService.getInvoicePreview(
      this.invoice,
      this.client,
      this.invoiceForm.get('date')?.value,
      this.invoiceForm.get('notes')?.value
    );
  }
}
