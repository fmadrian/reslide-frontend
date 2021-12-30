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
import { IndividualTypePayload } from 'src/app/payload/individualType/individual-type.payload';
import { IndividualTypeService } from 'src/app/service/individualType/individual-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-individual-type-form',
  templateUrl: './individual-type-form.component.html',
  styleUrls: ['./individual-type-form.component.scss'],
})
export class IndividualTypeFormComponent implements OnInit, OnChanges {
  // Input
  @Input() individualTypeInput: IndividualTypePayload | null;
  @Input() apiError: ApiError | null;
  // Form
  individualTypeForm: FormGroup;
  // Output
  @Output() individualTypeOutput = new EventEmitter<IndividualTypePayload>();
  @Output() refreshIndividualType = new EventEmitter<void>();
  constructor(
    private formBuilder: FormBuilder,
    private individualTypeService: IndividualTypeService,
    private snackbarService: SnackbarService
  ) {
    this.individualTypeInput = null;
    this.apiError = null;
    this.individualTypeForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.individualTypeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      notes: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.resetForm();
  }

  submit() {
    const result: IndividualTypePayload = {
      name: this.individualTypeForm.get('name')?.value,
      notes: this.individualTypeForm.get('notes')?.value,
    };
    // Add the id of the individual type to update it.
    if (this.individualTypeInput) {
      result.id = this.individualTypeInput.id;
    }
    // Send it to the parent component.
    this.individualTypeOutput.next(result);
  }
  resetForm() {
    if (this.individualTypeInput) {
      this.individualTypeForm
        .get('name')
        ?.setValue(this.individualTypeInput.name);
      this.individualTypeForm
        .get('notes')
        ?.setValue(this.individualTypeInput.notes);
    } else {
      this.individualTypeForm.reset();
    }
  }
  switchState() {
    if (this.individualTypeInput) {
      this.individualTypeService.deactivate(this.individualTypeInput).subscribe(
        () => {
          this.refreshIndividualType.next();
        },
        (error) => {
          this.snackbarService.show(error);
        }
      );
    }
  }

  getRefreshButtonName() {
    if (this.individualTypeInput && this.individualTypeInput.enabled !== null) {
      if (this.individualTypeInput.enabled === true) {
        return 'Deactivate';
      } else {
        return 'Activate';
      }
    } else {
      return '';
    }
  }
}
