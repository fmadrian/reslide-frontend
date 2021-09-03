import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { PaymentMethodPayload } from 'src/app/payload/paymentMethod/payment-method.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService {
  constructor(private httpClient: HttpClient) {}

  search(type = '') {
    return this.httpClient
      .get<PaymentMethodPayload[]>(ApiRoutes.paymentMethod.search, {
        params: { type },
      })
      .pipe(share());
  }
}
