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
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { PaymentPayload } from 'src/app/payload/payment/payment.payload';
import { PaymentMethodPayload } from 'src/app/payload/paymentMethod/payment-method.payload';
import { ProductPayload } from 'src/app/payload/product/product.payload';
import { DateService } from 'src/app/service/date/date.service';
import { PaymentService } from 'src/app/service/payment/payment.service';
import { PaymentMethodService } from 'src/app/service/paymentMethod/payment-method.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  apiError: any = null;
  productSelected: ProductPayload | null = null;
  paymentMethods$: Observable<PaymentMethodPayload[]> | undefined;
  // Selected values
  paymentMethodSelected: PaymentMethodPayload | null = null;
  // Input
  @Input() transactionId: number | undefined;
  // Output
  @Output() paymentFormOutput = new EventEmitter<PaymentPayload>();
  @Output() refreshInvoice = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public paymentMethodService: PaymentMethodService,
    public dialog: MatDialog,
    public paymentService: PaymentService,
    public dateService: DateService
  ) {
    this.paymentForm = this.formBuilder.group({});
  }
  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      notes: [''],
      date: [new Date(), [Validators.required]],
      paid: [1, [Validators.required, Validators.min(1)]],
      paymentMethodAutocomplete: ['', [Validators.required]],
    });
    this.paymentMethods$ = this.paymentForm
      .get('paymentMethodAutocomplete')
      ?.valueChanges.pipe(
        switchMap(() => {
          let type = this.paymentForm.get('paymentMethodAutocomplete')?.value;
          return this.paymentMethodService.search(type);
        }),
        catchError(() => {
          this.router.navigateByUrl(AppRoutes.error.internal); // Redirects the user.
          return of([]); // Returns empty observable with empty array.
        })
      );
  }
  submit() {
    if (this.paymentForm.valid && this.paymentMethodSelected !== null) {
      // If this is not an invoice update, has to send it back to the parent component.
      // If it is an invoice update, has to do an API call to create payment.
      // We know if it is an invoice update, because we will receive the transaction id.
      let payment: PaymentPayload = {
        date: this.dateService.getISOString(
          this.paymentForm.get('date')?.value
        ),
        notes: this.paymentForm.get('notes')?.value,
        paid: this.paymentForm.get('paid')?.value,
        paymentMethod: this.paymentMethodSelected.name,
        username: '',
      };
      if (this.transactionId) {
        payment = { ...payment, transactionId: this.transactionId };
        this.paymentService.create(payment).subscribe(
          () => {
            this.refreshInvoice.next();
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.paymentFormOutput.next(payment);
      }
    }
  }
  resetForm() {
    this.paymentForm.reset();
    this.paymentForm.get('date')?.setValue(new Date());
    this.paymentMethodSelected = null;
  }
  changePaymentMethod(paymentMethod: PaymentMethodPayload) {
    this.paymentMethodSelected = paymentMethod;
  }
}
