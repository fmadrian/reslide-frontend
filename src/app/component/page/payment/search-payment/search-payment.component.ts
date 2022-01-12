import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateRange } from 'src/app/payload/dateRange/date-range.interface';

import { PaymentPayload } from 'src/app/payload/payment/payment.payload';
import { DateService } from 'src/app/service/date/date.service';
import { PaymentService } from 'src/app/service/payment/payment.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-search-payment',
  templateUrl: './search-payment.component.html',
  styleUrls: ['./search-payment.component.scss'],
})
export class SearchPaymentComponent implements OnInit {
  isLoading = false;
  form = this.formBuilder.group({});
  payments: PaymentPayload[] = [];
  dateRange: DateRange = { start: new Date(), end: new Date() };
  title = ''; // Used in title when printing the results of a search.
  constructor(
    private paymentService: PaymentService,
    private dateService: DateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      type: ['invoice', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      if (params.start && params.end) {
        if (this.dateService.isValidDate(params.start)) {
          this.dateRange.start = this.dateService.getDate(params.start);
        }
        if (this.dateService.isValidDate(params.end)) {
          this.dateRange.end = this.dateService.getDate(params.end);
        }
      }
    });
    this.search();
  }

  receiveDate(newDateRange: DateRange | null) {
    if (newDateRange) {
      this.dateRange = newDateRange;
    }
  }
  search() {
    this.isLoading = true;

    const type = this.form.get('type')?.value;
    const start = this.dateService.getISOString(this.dateRange.start);
    const end = this.dateService.getISOString(this.dateRange.end);
    this.title = `${
      type === 'order' ? 'Order payments' : 'Invoice payments'
    } (${this.dateRange.start.toLocaleString()} - ${this.dateRange.end.toLocaleString()})`;
    this.paymentService.searchByDate(type, start, end).subscribe(
      (data) => {
        this.payments = data;
      },
      (error) => {
        this.router.navigateByUrl(AppRoutes.error.internal);
      },
      () => {
        this.isLoading = false;
        this.router.navigate([], { queryParams: { start, end } });
      }
    );
  }
}
