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
import { PaymentMethodPayload } from 'src/app/payload/paymentMethod/payment-method.payload';
import { ApiError } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  styleUrls: ['./payment-method-form.component.scss'],
})
export class PaymentMethodFormComponent implements OnInit, OnChanges {
  paymentMethodForm: FormGroup;
  @Input() paymentMethod: PaymentMethodPayload | null;
  @Input() apiError: ApiError | null;
  @Output() paymentMethodOutput = new EventEmitter<PaymentMethodPayload>();

  constructor(private formBuilder: FormBuilder) {
    this.paymentMethod = null;
    this.apiError = null;
    this.paymentMethodForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.paymentMethodForm = this.formBuilder.group({
      name: ['', Validators.required],
      notes: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  submit() {
    // If we have an id (payment method), we're updating it.
    // Otherwise, we are creating a new payment method.
    let values = {
      name: '',
      notes: '',
    };
    const result: PaymentMethodPayload = {
      name: this.paymentMethodForm.get('name')?.value,
      notes: this.paymentMethodForm.get('notes')?.value,
    };
    if (this.paymentMethod) {
      result.id = this.paymentMethod.id;
    }
    this.paymentMethodOutput.emit(result);
    /*Object.entries(this.paymentMethodForm.controls)
    .forEach(([key, value]) => {
      values[key] = value;
    });*/
  }
  reset() {
    this.paymentMethodForm.reset();
    this.loadData();
  }
  loadData() {
    if (this.paymentMethod) {
      this.paymentMethodForm.get('name')?.setValue(this.paymentMethod.name);
      this.paymentMethodForm.get('notes')?.setValue(this.paymentMethod.notes);
    }
  }
}
