import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { OrderPayload } from 'src/app/payload/order/order.payload';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { PaymentPayload } from 'src/app/payload/payment/payment.payload';
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { IndividualService } from 'src/app/service/individual/individual.service';
import { AppRoutes } from 'src/app/utils/appRoutes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/service/order/order.service';
import { OrderDetailPayload } from 'src/app/payload/orderDetail/order-detail.payload';
import { DateService } from 'src/app/service/date/date.service';
import { MatRadioChange } from '@angular/material/radio';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit, OnChanges {
  // Form
  orderForm: FormGroup;
  // Autocomplete bar
  providers$: undefined | Observable<IndividualPayload[]>;
  // Output
  @Output() orderOutput = new EventEmitter<OrderPayload>();
  @Output() refreshOrder = new EventEmitter<void>();
  // Input
  @Input() apiError: any | null = null;
  @Input() orderInput: OrderPayload | null = null;
  // Order information
  provider: IndividualPayload | null = null;
  order: OrderPayload;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private individualService: IndividualService,
    private router: Router,
    private orderService: OrderService,
    private dialogService: DialogService,
    private dateService: DateService,
    private snackbarService: SnackbarService
  ) {
    this.orderForm = this.formBuilder.group({});
    this.providers$ = new Observable<IndividualPayload[]>();
    this.order = this.resetOrder();
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      expectedDeliveryDate: [''],
      actualDeliveryDate: [''],
      providerAutocomplete: ['', Validators.required],
      notes: [''],
      status: ['', Validators.required],
    });
    this.getOrderPreview();

    // Chain 2 or more methods applied to same observable with pipe
    // 1st function: switchMap will switch from one observable to the other.
    // 2nd function: catchError will catch a error thrown by the observable and return a new observable or error.
    // Chain 2 observables with switchMap.
    // 1st observable: Observes if the value changes in the providerAutocomplete autocomplete bar.
    // 2nd observable: Does the query.
    this.providers$ = this.orderForm
      .get('providerAutocomplete')
      ?.valueChanges.pipe(
        switchMap(() => {
          let query = this.orderForm.get('providerAutocomplete')?.value;
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
    if (this.orderInput) {
      this.resetForm();
    } else {
      // If we receive a value (update), it has to pass into the other child components.
      this.getOrderPreview();
    }
  }
  /**
   * Changes the selected provider.
   */
  changeProvider(provider: IndividualPayload | null) {
    if (provider) {
      this.provider = provider;
      this.orderForm
        .get('providerAutocomplete')
        ?.setValue(`${this.provider?.code} ${this.provider?.name}`);
      this.order = {
        ...this.order,
        providerName: this.provider.name,
        providerCode: this.provider.code,
      };
    }
  }
  openDialog(name: string) {
    let dialog = this.dialogService.open(name);
    if (dialog !== null) {
      dialog.subscribe((data) => {
        this.changeProvider(data);
      });
    }
  }
  /**
   * Receives the refresh order signal from a child component and propagates it back to its parent component
   */
  getRefreshOrder() {
    this.refreshOrder.next();
  }
  /**
   * Only used when creating an order.
   * Receives a single detail from the form and adds it to the details array.
   * */
  receiveDetail(detail: OrderDetailPayload) {
    // If we use push function, the array is not changing therefore, the child components won't be able to detect new values.
    // We have to spread the array and add the new value.
    this.order.details = [...this.order.details, detail];
    this.getOrderPreview();
  }
  /**
   * Only used when creating an order.
   * Receives multiple details from the results component.
   * It's used when we delete a detail and want to propagate the new details array.
   * */
  receiveDetails(details: OrderDetailPayload[]) {
    this.order.details = [...details];
    this.getOrderPreview();
  }
  /**
   * Only used when creating an order.
   * Receives a single payment from the form and adds it to the payments array.
   * */
  receivePayment(payment: PaymentPayload) {
    this.order.transaction.payments = [
      ...this.order.transaction.payments,
      payment,
    ];
    this.getOrderPreview();
  }
  /**
   * Only used when creating an order.
   * Receives multiple payments from the results component.
   * It's used when we delete a detail and want to propagate the new payments array.
   * */
  receivePayments(payments: PaymentPayload[]) {
    this.order.transaction.payments = [...payments];
    this.getOrderPreview();
  }

  resetForm() {
    // Resets the order and the form values.
    this.orderForm.reset();
    this.order = this.resetOrder();
    this.orderForm.get('date')?.setValue(this.order.transaction.date);
    this.orderForm.get('status')?.setValue(this.order.status);
    // Reset the dates.
    const expectedDeliveryDate = this.order.expectedDeliveryDate
      ? this.order.expectedDeliveryDate
      : null;
    const actualDeliveryDate = this.order.actualDeliveryDate
      ? this.order.actualDeliveryDate
      : null;
    this.orderForm.get('expectedDeliveryDate')?.setValue(expectedDeliveryDate);
    this.orderForm.get('actualDeliveryDate')?.setValue(actualDeliveryDate);
    this.orderForm.get('notes')?.setValue(this.order.transaction.notes);
  }
  resetOrder() {
    // If we are updating an order, we reload the values received.
    if (!this.orderInput) {
      // No input, no provider
      this.changeProvider(null);
    } else {
      // Build the provider from the information received from the order
      const provider: IndividualPayload = {
        name: this.orderInput.providerName,
        code: this.orderInput.providerCode,
        addresses: [],
        contacts: [],
        notes: '',
      };
      this.changeProvider(provider);
    }
    this.apiError = null;
    return this.orderService.resetOrder(this.orderInput);
  }
  /**
   * Submits an order to its parent component.
   */
  submit() {
    // If we are creating the order, we send it to the parent component.
    if (
      this.orderForm.valid &&
      this.order.details.length > 0 &&
      this.order &&
      this.provider
    ) {
      // If we are updating the order, we change the date and notes of the existent order.
      if (this.order.id) {
        this.order.transaction.date = this.orderForm.get('date')?.value;
        if (this.order.expectedDeliveryDate) {
          this.order.expectedDeliveryDate = this.dateService.getISOString(
            this.orderForm.get('expectedDeliveryDate')?.value
          );
        }
        if (this.order.actualDeliveryDate) {
          this.order.actualDeliveryDate = this.dateService.getISOString(
            this.orderForm.get('actualDeliveryDate')?.value
          );
        }
        this.order.transaction.notes = this.orderForm.get('notes')?.value;
      } else {
        // When are creating an order, we get update the last preview of the order.
        this.getOrderPreview();
      }
      // We send it to the parent component.
      this.orderOutput.next(this.order);
    }
  }
  getOrderPreview() {
    this.order = this.orderService.getOrderPreview(
      this.order,
      this.provider,
      this.orderForm.get('date')?.value,
      this.orderForm.get('expectedDeliveryDate')?.value,
      this.orderForm.get('actualDeliveryDate')?.value,
      this.orderForm.get('status')?.value,
      this.orderForm.get('notes')?.value
    );
  }
  clearDate(picker: string) {
    this.orderForm.get(picker)?.setValue(null);
    this.getOrderPreview();
  }
  deliverAllProducts() {
    if (this.order.id) {
      this.orderService.deliverAllProducts(this.order).subscribe(
        (response) => {
          this.snackbarService.show(response.message);
          this.refreshOrder.next();
        },
        (error) => {
          this.snackbarService.show(error.message);
        }
      );
    }
  }
  switchStatus(event: MatRadioChange) {
    this.order.status = event.value;
  }
}
