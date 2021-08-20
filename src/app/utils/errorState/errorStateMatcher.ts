import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    // Indicates if a form has been submitted
    const isSubmitted = form && form.submitted;
    // Restrictions that could make a form input invalid.
    // minlength isntead of minLength
    const isNotValid =
      control?.errors?.required ||
      control?.errors?.minlength ||
      control?.errors?.maxlength ||
      control?.errors?.min;
    // Returns error state if any of the restrictions is not being met. Or if we try to submit it.
    return (control?.dirty && isNotValid) || (isNotValid && isSubmitted);
    // return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
