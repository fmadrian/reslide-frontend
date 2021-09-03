import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoicePayload } from 'src/app/payload/invoice/invoice.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}
  create(payload: InvoicePayload) {
    return this.httpClient.post(ApiRoutes.invoice.create, payload);
  }
  search(start: string, end: string) {
    return this.httpClient.get<InvoicePayload[]>(ApiRoutes.invoice.search, {
      params: {
        start,
        end,
      },
    });
  }
  get(id: number) {
    return this.httpClient.get<InvoicePayload>(ApiRoutes.invoice.get(id));
  }
  update(payload: InvoicePayload) {
    return this.httpClient.post(ApiRoutes.invoice.update, payload);
  }
}
