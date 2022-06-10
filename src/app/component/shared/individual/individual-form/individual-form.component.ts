import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AddressPayload } from 'src/app/payload/address/address.payload';
import { ContactPayload } from 'src/app/payload/contact/contact.payload';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { IndividualTypePayload } from 'src/app/payload/individualType/individual-type.payload';
import { IndividualTypeService } from 'src/app/service/individualType/individual-type.service';
import { AppRoutes } from 'src/app/utils/appRoutes';
import { FormValidation } from 'src/app/utils/formValidation';

@Component({
  selector: 'app-individual-form',
  templateUrl: './individual-form.component.html',
  styleUrls: ['./individual-form.component.scss'],
})
export class IndividualFormComponent implements OnInit {
  // Form.
  individualForm: FormGroup;
  hidePassword = true;
  formValidation = FormValidation;
  // Values sent to the child component.
  @Input() individualInput: IndividualPayload | null; // If we are modifying a user, we pass the user
  @Input() apiError: any = null;
  @Output() individualOutput = new EventEmitter<IndividualPayload>();
  individualData: IndividualPayload;
  // Select data
  individualTypes: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private individualTypeService: IndividualTypeService,
    private router: Router
  ) {
    this.individualForm = this.formBuilder.group({});
    this.individualInput = null;
    this.individualData = this.resetIndividualData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.resetForm();
  }
  ngOnInit(): void {
    // If we are updating the user, we load the values received from the parent component.
    if (this.individualInput !== null) {
      this.individualData = {
        ...this.individualInput,
      };
    }
    // Loads the individual types into the select component.
    // They have to be converted to string to be compatible with
    // the INDVIDUAL TYPE received from the individualData (if there is any),
    // because the type received is STRING not a IndividualTypePayload
    // TLDR: Select receives IndividualTypePayload, comparison has to be done with IndividualTypePayload
    // Select receives string, comparison has to be done with string.
    this.individualTypeService.getAll().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.individualTypes.push(data[i].name);
        }
      },
      (error) => {
        // Show error message or redirect.
        this.router.navigateByUrl(AppRoutes.error.internal);
      }
    );
    // Inserts the default values in the form.
    this.individualForm = this.formBuilder.group({
      type: [this.individualData.type, Validators.required],
      name: [this.individualData.name, Validators.required],
      code: [this.individualData.code, Validators.required],
      notes: [this.individualData.notes],
    });
  }

  /**
   * Submits form to parent component.
   *  */
  submit() {
    if (this.individualForm.valid) {
      // Takes the existent information about the user and replaces the fields with the output on the form.
      this.individualOutput.next({
        ...this.individualData,
        type: this.individualForm.get('type')?.value,
        name: this.individualForm.get('name')?.value,
        code: this.individualForm.get('code')?.value,
        notes: this.individualForm.get('notes')?.value,
      });
    }
  }
  receiveContactsOutput(contacts: ContactPayload[]) {
    // Takes the user info and replaces the contacts.
    this.individualData = {
      ...this.individualData,
      contacts,
    };
  }
  receiveAddressOutput(addresses: AddressPayload[]) {
    // Takes the user info and replaces the addresses.
    this.individualData = {
      ...this.individualData,
      addresses,
    };
  }
  resetForm() {
    this.individualForm.reset();
    this.individualForm.markAsUntouched();
    if (this.individualInput !== null) {
      this.individualData = {
        ...this.individualInput,
      };
    } else {
      this.individualData = this.resetIndividualData();
    }
    // Reset the data in the form.
    this.individualForm.get('type')?.setValue(this.individualData.type);
    this.individualForm.get('name')?.setValue(this.individualData.name);
    this.individualForm.get('code')?.setValue(this.individualData.code);
    this.individualForm.get('notes')?.setValue(this.individualData.notes);
  }
  resetIndividualData() {
    return {
      name: '',
      code: '',
      notes: '',
      type: '',
      addresses: [],
      contacts: [],
    };
  }
  compare(option: any) {
    if (option.name === this.individualData.type) {
      return true;
    }
    return false;
  }
}
