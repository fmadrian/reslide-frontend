import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactTypePayload } from 'src/app/payload/contactType/contact-type.payload';
import { ContactTypeService } from 'src/app/service/contactType/contact-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-contact-type-form',
  templateUrl: './contact-type-form.component.html',
  styleUrls: ['./contact-type-form.component.scss'],
})
export class ContactTypeFormComponent implements OnInit, OnChanges {
  // In this case, we're using the contact type variable as the input.
  // as an alternative to have an input variable and a contact type variable.
  @Input() contactType: ContactTypePayload | null = null;
  @Input() apiError: ApiError | null = null;
  @Output() contactTypeOutput = new EventEmitter<ContactTypePayload>();
  @Output() refreshOutput = new EventEmitter<void>();

  form = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private contactTypeService: ContactTypeService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      notes: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.resetForm();
  }

  submit() {
    const type = this.form.get('type')?.value;
    const notes = this.form.get('notes')?.value;
    if (this.contactType) {
      // When updating we have to add the id to the request and change type and notes.
      this.contactType = {
        ...this.contactType,
        type,
        notes,
      };
    } else {
      // When creating we only need the type and notes
      this.contactType = {
        type,
        notes,
      };
    }
    this.contactTypeOutput.next(this.contactType);
  }

  resetForm() {
    if (this.contactType) {
      this.form.get('type')?.setValue(this.contactType.type);
      this.form.get('notes')?.setValue(this.contactType.notes);
    } else {
      this.form.reset();
    }
  }

  switchStatus() {
    if (this.contactType) {
      this.contactTypeService.switchStatus(this.contactType).subscribe(
        () => {
          this.refreshOutput.next();
        },
        (error) => {
          this.snackbarService.show(error);
        }
      );
    }
  }
}
