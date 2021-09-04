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
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { IndividualService } from 'src/app/service/individual/individual.service';
import { NumberService } from 'src/app/service/number/number.service';
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
    private numberService: NumberService,
    private dialogService: DialogService
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
          return this.individualService.search(query);
        }),
        catchError(() => {
          this.router.navigateByUrl(AppRoutes.error.internal); // Redirects the user.
          return of([]); // Returns empty observable with empty array.
        })
      );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.invoiceInput) {
      this.invoice = this.resetInvoice();
      this.resetForm();
    } else {
      // If we receive a value (update), it has to pass into the other child components.
      this.getInvoiceAproximate();
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
    this.getInvoiceAproximate();
  }
  /**
   * Only used when creating an invoice.
   * Receives multiple details from the results component.
   * It's used when we delete a detail and want to propagate the new details array.
   * */
  receiveDetails(details: InvoiceDetailPayload[]) {
    this.invoice.details = [...details];
    this.getInvoiceAproximate();
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
    this.getInvoiceAproximate();
  }
  /**
   * Only used when creating an invoice.
   * Receives multiple payments from the results component.
   * It's used when we delete a detail and want to propagate the new payments array.
   * */
  receivePayments(payments: PaymentPayload[]) {
    this.invoice.transaction.payments = [...this.invoice.transaction.payments];
    this.getInvoiceAproximate();
  }

  resetForm() {
    // Resets the invoice and the form values.
    this.invoiceForm.reset();
    this.invoice = this.resetInvoice();
    this.invoiceForm.get('date')?.setValue(this.invoice?.transaction.date);
    this.invoiceForm.get('clientAutocomplete')?.setValue('');
    this.invoiceForm.get('notes')?.setValue(this.invoice?.transaction.notes);
  }
  resetInvoice() {
    let result: InvoicePayload;
    // If we are updating an invoice, we reload the values received.
    if (!this.invoiceInput) {
      result = {
        clientCode: '',
        clientName: '',
        details: [],
        transaction: {
          username: '',
          date: '',
          notes: '',
          payments: [],
        },
        status: '',
      };
      this.client = null;
    } else {
      result = {
        ...this.invoiceInput,
        details: [...this.invoiceInput.details],
        transaction: { ...this.invoiceInput.transaction },
      };
      this.client = null;
    }
    return result;
  }
  /**
   * Submits an invoice to its parent component.
   */
  submit() {
    // If we are creating, we send it to the parent component.
    if (
      this.invoiceForm.valid &&
      this.invoice.details.length > 0 &&
      this.invoice &&
      this.client
    ) {
      this.invoiceOutput.next(this.invoice);
      this.resetForm();
    }
  }
  /**
   * Only used when creating an invoice.
   * Gets an aproximate of the invoice with its payments to show on screen
   */
  getInvoiceAproximate() {
    let subtotal = this.invoice.details
      .map((detail) => this.numberService.numberFilter(detail.subtotal))
      .reduce(this.numberService.add, 0);

    let tax = this.invoice.details
      .map((detail) => this.numberService.numberFilter(detail.tax))
      .reduce(this.numberService.add, 0);

    let discount = this.invoice.details
      .map((detail) => this.numberService.numberFilter(detail.discount))
      .reduce(this.numberService.add, 0);

    let total = this.invoice.details
      .map((detail) => this.numberService.numberFilter(detail.total))
      .reduce(this.numberService.add, 0);

    let paid = this.invoice.transaction.payments
      .map((payment) => this.numberService.numberFilter(payment.paid))
      .reduce(this.numberService.add, 0);

    this.invoice = {
      clientCode: this.client ? this.client.code : '',
      clientName: this.client ? this.client.name : '',
      owed: total - paid,
      paid,
      subtotal,
      tax,
      total,
      discount,
      details: this.invoice.details,
      status: 'DELIVERED',
      transaction: {
        date: this.getISODate(this.invoiceForm.get('date')?.value),
        notes: this.invoiceForm.get('notes')?.value,
        payments: this.invoice.transaction.payments,
        username: '',
      },
    };
  }

  getISODate(date: Date) {
    if (date) {
      date.setHours(date.getHours() - 6);
      return date.toISOString();
    }
    return '';
  }
}
