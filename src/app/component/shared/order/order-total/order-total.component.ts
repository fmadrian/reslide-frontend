import { Component, Input, OnInit } from '@angular/core';
import { OrderPayload } from 'src/app/payload/order/order.payload';
import { DateService } from 'src/app/service/date/date.service';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss'],
})
export class OrderTotalComponent implements OnInit {
  @Input() order: OrderPayload | null = null;
  constructor(private dateService: DateService) {}

  ngOnInit(): void {}
  getDate(date: string | undefined) {
    if (this.order && this.order.transaction && date && date !== '') {
      return this.dateService.getDate(date).toLocaleString();
    }
    return '';
  }
  getOrderProvider() {
    if (this.order) {
      if (this.order.providerCode !== '') {
        return `[${this.order.providerCode}] ${this.order.providerName}`;
      } else {
        return '';
      }
    }
    return '';
  }
}
