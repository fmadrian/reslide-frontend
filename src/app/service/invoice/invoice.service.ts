import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { InvoicePayload } from 'src/app/payload/invoice/invoice.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';
import { DateService } from '../date/date.service';
import { NumberService } from '../number/number.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(
    private httpClient: HttpClient,
    private numberService: NumberService,
    private dateService: DateService
  ) {}
  create(payload: InvoicePayload) {
    return this.httpClient.post<InvoicePayload>(
      ApiRoutes.invoice.create,
      payload
    );
  }
  search(start: string, end: string, clientCode = '') {
    if (clientCode.trim() === '') {
      return this.httpClient.get<InvoicePayload[]>(ApiRoutes.invoice.search, {
        params: {
          start,
          end,
        },
      });
    }
    return this.httpClient.get<InvoicePayload[]>(
      ApiRoutes.invoice.searchByClient,
      {
        params: {
          start,
          end,
          clientCode,
        },
      }
    );
  }
  get(id: number) {
    return this.httpClient.get<InvoicePayload>(ApiRoutes.invoice.get(id));
  }
  update(payload: InvoicePayload) {
    return this.httpClient.put(ApiRoutes.invoice.update, payload);
  }
  switchStatus(payload: InvoicePayload) {
    return this.httpClient.put<any>(ApiRoutes.invoice.switchStatus, payload);
  }
  /**
   * Only used when creating an invoice.
   * When we are updating, the informations gets reloaded every time it changes.
   * Gets an aproximate of the invoice with its payments to show on screen.
   */
  getInvoicePreview(
    invoice: InvoicePayload,
    client: IndividualPayload | null,
    date: Date,
    notes: string
  ) {
    if (!invoice.id) {
      let subtotal = invoice.details
        .map((detail) => this.numberService.numberFilter(detail.subtotal))
        .reduce(this.numberService.add, 0);

      let tax = invoice.details
        .map((detail) => this.numberService.numberFilter(detail.tax))
        .reduce(this.numberService.add, 0);

      let discount = invoice.details
        .map((detail) => this.numberService.numberFilter(detail.discount))
        .reduce(this.numberService.add, 0);

      let total = invoice.details
        .map((detail) => this.numberService.numberFilter(detail.total))
        .reduce(this.numberService.add, 0);

      let paid = invoice.transaction.payments
        .map((payment) => this.numberService.numberFilter(payment.paid))
        .reduce(this.numberService.add, 0);
      invoice = {
        clientCode: client ? client.code : '',
        clientName: client ? client.name : '',
        owed: total - paid,
        paid,
        subtotal,
        tax,
        total,
        discount,
        details: invoice.details,
        status: '',
        transaction: {
          date: this.dateService.getISOString(date),
          //date: this.dateService.getISOString(invoiceForm.get('date')?.value),
          notes, //notes: invoiceForm.get('notes')?.value,
          payments: invoice.transaction.payments,
          username: '',
        },
      };
    }
    return invoice;
  }
  resetInvoice(invoiceInput: InvoicePayload | null) {
    let result: InvoicePayload;
    // If we are updating an invoice, we reload the values received.
    if (!invoiceInput) {
      result = {
        clientCode: '',
        clientName: '',
        details: [],
        transaction: {
          username: '',
          date: this.dateService.getISOString(new Date()),
          notes: '',
          payments: [],
        },
        status: '',
        owed: 0,
        paid: 0,
        subtotal: 0,
        tax: 0,
        total: 0,
        discount: 0,
      };
    } else {
      result = {
        ...invoiceInput,
        details: [...invoiceInput.details],
        transaction: { ...invoiceInput.transaction },
      };
    }
    return result;
  }
}
