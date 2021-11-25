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
import { MeasurementTypePayload } from 'src/app/payload/measurementType/measurement-type.payload';
import { ApiError } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-measurement-type-form',
  templateUrl: './measurement-type-form.component.html',
  styleUrls: ['./measurement-type-form.component.scss'],
})
export class MeasurementTypeFormComponent implements OnInit, OnChanges {
  measurementTypeForm: FormGroup;
  @Input() measurementType: MeasurementTypePayload | null;
  @Input() apiError: ApiError | null;
  @Output() measurementTypeOutput = new EventEmitter<MeasurementTypePayload>();
  constructor(private formBuilder: FormBuilder) {
    this.measurementType = null;
    this.apiError = null;
    this.measurementTypeForm = this.formBuilder.group({});
  }
  ngOnInit(): void {
    this.measurementTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      notes: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }
  loadData() {
    if (this.measurementType) {
      this.measurementTypeForm.get('name')?.setValue(this.measurementType.name);
      this.measurementTypeForm
        .get('notes')
        ?.setValue(this.measurementType.notes);
    }
  }
  submit() {
    const result: MeasurementTypePayload = {
      name: this.measurementTypeForm.get('name')?.value,
      notes: this.measurementTypeForm.get('notes')?.value,
    };
    // Add the id, if we're updating.
    if (this.measurementType) {
      result.id = this.measurementType.id;
    }
    // Send it back to parent component-
    this.measurementTypeOutput.emit(result);
  }
  resetForm() {
    this.measurementTypeForm.reset();
    this.loadData();
  }
}
