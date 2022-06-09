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
      // Get totals.
      const subtotal = this.numberService.addAll(
        invoice.details.map((detail) => detail.subtotal)
      );
      const tax = this.numberService.addAll(
        invoice.details.map((detail) => detail.tax)
      );
      const discount = this.numberService.addAll(
        invoice.details.map((detail) => detail.discount)
      );
      const total = this.numberService.addAll(
        invoice.details.map((detail) => detail.total)
      );
      const paid = this.numberService.addAll(
        invoice.transaction.payments.map((payment) => payment.paid)
      );

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
  getTotals(invoices: InvoicePayload[]) {
    return [
      {
        name: 'Total',
        value: this.numberService.addAll(
          invoices.map((invoice) => invoice.total)
        ),
      },
      {
        name: 'Subtotal',
        value: this.numberService.addAll(
          invoices.map((invoice) => invoice.subtotal)
        ),
      },
      {
        name: 'Paid',
        value: this.numberService.addAll(
          invoices.map((invoice) => invoice.paid)
        ),
      },
      {
        name: 'Owed',
        value: this.numberService.addAll(
          invoices.map((invoice) => invoice.owed)
        ),
      },
      {
        name: 'Discount',
        value: this.numberService.addAll(
          invoices.map((invoice) => invoice.discount)
        ),
      },
      {
        name: 'Tax',
        value: this.numberService.addAll(
          invoices.map((invoice) => invoice.tax)
        ),
      },
    ];
  }
}
