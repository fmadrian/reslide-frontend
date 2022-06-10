import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateRange } from 'src/app/payload/dateRange/date-range.interface';
import { DateService } from 'src/app/service/date/date.service';

@Component({
  selector: 'app-search-invoice',
  templateUrl: './search-invoice.component.html',
  styleUrls: ['./search-invoice.component.scss'],
})
export class SearchInvoiceComponent implements OnInit {
  dateRange: DateRange = {
    start: this.dateService.setTimeTo(new Date(), 'start'),
    end: this.dateService.setTimeTo(new Date(), 'end'),
  };
  constructor(
    private route: ActivatedRoute,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
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
  }
}
