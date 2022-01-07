import { Component, OnInit } from '@angular/core';
import { OrderPayload } from 'src/app/payload/order/order.payload';
import { ProductPayload } from 'src/app/payload/product/product.payload';
import { DateService } from 'src/app/service/date/date.service';
import { OrderService } from 'src/app/service/order/order.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  today = new Date();
  start = this.dateService.getISOString(
    this.dateService.setTimeTo(this.today, 'start')
  );
  end = this.dateService.getISOString(
    this.dateService.setTimeTo(this.today, 'finish')
  );

  constructor(private dateService: DateService) {}
  ngOnInit() {}
}
