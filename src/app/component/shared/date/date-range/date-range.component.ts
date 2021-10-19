import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateRange } from 'src/app/payload/dateRange/date-range.interface';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() showToggle = false; // Toggle that let's us deactivate the date.
  isActive = true;
  @Input() dateInput: DateRange = { start: new Date(), end: new Date() };
  @Output() dateOutput = new EventEmitter<DateRange | null>();

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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.showToggle) {
      this.isActive = false;
    }
  }

  ngOnInit(): void {}

  sendValue() {
    if (this.isActive) {
      this.dateOutput.next({
        start: this.form.get('start')?.value,
        end: this.form.get('end')?.value,
      });
    } else {
      this.dateOutput.next(null);
    }
  }

  toggle() {
    // De(activates) the component and sends the value back to the parent component.
    this.isActive = !this.isActive;
    this.sendValue();
  }
}
