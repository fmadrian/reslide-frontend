import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceDetailPayload } from 'src/app/payload/invoiceDetail/invoice-detail.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class InvoiceDetailService {
  constructor(private httpClient: HttpClient) {}
  // Sends a invoice detail to be validated.
  validate(payload: InvoiceDetailPayload) {
    return this.httpClient.post<InvoiceDetailPayload>(
      ApiRoutes.invoiceDetail.validate,
      payload
    );
  }
}
