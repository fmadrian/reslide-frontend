import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateRange } from 'src/app/payload/dateRange/date-range.interface';
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
  searchByDate(type: string, status: string, start: string, end: string) {
    return this.httpClient.get<PaymentPayload[]>(
      ApiRoutes.payment.searchByDate,
      {
        params: { type, status, start, end },
      }
    );
  }
}
