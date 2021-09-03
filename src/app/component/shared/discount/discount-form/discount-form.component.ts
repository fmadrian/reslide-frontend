import {
  Component,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscountPayload } from 'src/app/payload/discount/discount.payload';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.scss'],
})
export class DiscountFormComponent implements OnInit {
  discountForm: FormGroup;
  //@Output() discountOutput = new EventEmitter<DiscountPayload>();
  // @Input() discountInput: DiscountPayload | undefined;
  // Dialog
  dialogRef: MatDialogRef<DiscountFormComponent> | null;
  // Inject data into the dialog using the @Inject directive
  constructor(
    private formBuilder: FormBuilder,
    public injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: DiscountPayload
  ) {
    this.discountForm = this.formBuilder.group({});
    // Tries to inject a dialog reference (if it doesn't exist, it returns null)
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }
  ngOnInit(): void {
    this.discountForm = this.formBuilder.group({
      percentage: [0, [Validators.required, Validators.min(1)]],
      reason: ['', Validators.required],
      notes: [''],
    });
    // If there is data being passed into the dialog, put into the inputs.
    if (this.data) {
      this.discountForm.get('percentage')?.setValue(this.data.percentage);
      this.discountForm.get('reason')?.setValue(this.data.reason);
      this.discountForm.get('notes')?.setValue(this.data.notes);
    }
  }
  resetForm() {
    this.discountForm.reset();
  }
  closeDialog() {
    let result: DiscountPayload | null = null;
    if (this.dialogRef !== null) {
      if (this.discountForm.valid) {
        result = {
          percentage: this.discountForm.get('percentage')?.value,
          reason: this.discountForm.get('reason')?.value,
          notes: this.discountForm.get('notes')?.value,
        };
      }
      // Closes the dialog and sends the individual selected to whoever called the dialog.
      this.dialogRef?.close(result);
    }
  }
}
