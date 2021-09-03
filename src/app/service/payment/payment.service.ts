import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentPayload } from 'src/app/payload/payment/payment.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  create(payload: PaymentPayload) {
    return this.httpClient.post(ApiRoutes.payment.create, payload);
  }
  overturn(payload: PaymentPayload) {
    return this.httpClient.put(ApiRoutes.payment.overturn, payload);
  }
}
