import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateRange } from 'src/app/payload/dateRange/date-range.interface';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent implements OnInit {
  @Input() title = '';
  @Input() dateInput: DateRange = { start: new Date(), end: new Date() };
  @Output() dateOutput = new EventEmitter<DateRange>();

  @Output() endDate = new EventEmitter<Date>();
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    const constraints: any[] = [];
    // Creates the field and adds the constraints.
    this.form = this.formBuilder.group({
      start: [this.dateInput.start, ...constraints],
      end: [this.dateInput.end, ...constraints],
    });
  }

  ngOnInit(): void {}

  sendValue() {
    this.dateOutput.next({
      start: this.form.get('start')?.value,
      end: this.form.get('end')?.value,
    });
  }
}
