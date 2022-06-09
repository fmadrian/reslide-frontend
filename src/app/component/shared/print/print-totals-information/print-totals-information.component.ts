import { Component, Input, OnInit } from '@angular/core';
import { TotalsInformation } from 'src/app/utils/totals-information';

@Component({
  selector: 'app-print-totals-information',
  templateUrl: './print-totals-information.component.html',
  styleUrls: ['./print-totals-information.component.scss'],
})
export class PrintTotalsInformationComponent implements OnInit {
  constructor() {}
  @Input() totals: TotalsInformation[] = [];
  ngOnInit(): void {}
}
