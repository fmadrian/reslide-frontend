import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentMethodPayload } from 'src/app/payload/paymentMethod/payment-method.payload';
import { PaymentMethodService } from 'src/app/service/paymentMethod/payment-method.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-update-payment-method',
  templateUrl: './update-payment-method.component.html',
  styleUrls: ['./update-payment-method.component.scss'],
})
export class UpdatePaymentMethodComponent implements OnInit {
  apiError: ApiError | null;
  retrieveError: ApiError | null;
  paymentMethodInput: PaymentMethodPayload | null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private paymentMethodService: PaymentMethodService
  ) {
    this.apiError = null;
    this.retrieveError = null;
    this.paymentMethodInput = null;
  }

  ngOnInit(): void {
    // Get the id from the path variable
    const id = this.activatedRoute.snapshot.params.id;
    // Get the payment method.
    this.paymentMethodService.get(id).subscribe(
      (response) => {
        this.paymentMethodInput = response;
        this.retrieveError = null;
      },
      (error) => {
        this.paymentMethodInput = null;
        this.retrieveError = error;
      }
    );
  }
  update(paymentMethod: PaymentMethodPayload) {
    this.paymentMethodService.update(paymentMethod).subscribe(
      (data) => {
        this.snackbarService.show('Payment method updated');
      },
      (error) => {
        this.snackbarService.show(error);
        this.apiError = ApiErrorMessage(error);
      }
    );
  }
}
