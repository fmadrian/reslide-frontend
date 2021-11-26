import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentMethodPayload } from 'src/app/payload/paymentMethod/payment-method.payload';
import { PaymentMethodService } from 'src/app/service/paymentMethod/payment-method.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-search-payment-method',
  templateUrl: './search-payment-method.component.html',
  styleUrls: ['./search-payment-method.component.scss'],
})
export class SearchPaymentMethodComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
