import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethodPayload } from 'src/app/payload/paymentMethod/payment-method.payload';
import { PaymentMethodService } from 'src/app/service/paymentMethod/payment-method.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-create-payment-method',
  templateUrl: './create-payment-method.component.html',
  styleUrls: ['./create-payment-method.component.scss'],
})
export class CreatePaymentMethodComponent implements OnInit {
  apiError: ApiError | null;
  constructor(
    private router: Router,
    private paymentMethodService: PaymentMethodService,
    private snackbarService: SnackbarService
  ) {
    this.apiError = null;
  }
  ngOnInit(): void {}

  create(paymentMethod: PaymentMethodPayload) {
    this.paymentMethodService.create(paymentMethod).subscribe(
      (data) => {
        this.snackbarService.show('Payment method created');
        if (data.id) {
          this.router.navigateByUrl(AppRoutes.paymentMethod.update_id(data.id));
        }
      },
      (error) => {
        this.snackbarService.show(error);
        this.apiError = ApiErrorMessage(error);
      }
    );
  }
}
