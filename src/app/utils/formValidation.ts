import { FormGroup } from '@angular/forms';

export const FormValidation = {
  errors: ['minlength', 'required', 'maxlength'],
  getErrorMessage: (controlName: string, form: FormGroup) => {
    let control = form.get(controlName);
    if (control?.errors?.required) {
      return `Please introduce a ${controlName}`;
    } else if (control?.errors?.minlength) {
      return `The ${controlName} can't be shorter than ${control?.errors?.minlength.requiredLength} characters`;
    } else if (control?.errors?.maxlength) {
      return `The ${controlName} can't be longer than ${control?.errors?.maxlength.requiredLength} characters`;
    } else if (control?.errors?.min) {
      return `The ${controlName} has to be more than ${control?.errors?.min.requiredLength}`;
    }
    return '';
  },
};
