import { Component, Input, OnInit } from '@angular/core';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { InvoicePayload } from 'src/app/payload/invoice/invoice.payload';
import { DateService } from 'src/app/service/date/date.service';

@Component({
  selector: 'app-invoice-total',
  templateUrl: './invoice-total.component.html',
  styleUrls: ['./invoice-total.component.scss'],
})
export class InvoiceTotalComponent implements OnInit {
  @Input() invoice: InvoicePayload | null = null;
  constructor(private dateService: DateService) {}

  ngOnInit(): void {}
  getInvoiceDate() {
    if (
      this.invoice &&
      this.invoice.transaction &&
      this.invoice.transaction.date &&
      this.invoice.transaction.date !== ''
    ) {
      return this.dateService.getLocaleString(this.invoice.transaction.date);
    }
    return '';
  }
  getInvoiceClient() {
    if (this.invoice) {
      if (this.invoice.clientCode !== '') {
        return `[${this.invoice.clientCode}] ${this.invoice.clientName}`;
      } else {
        return '';
      }
    }
    return '';
  }
}
