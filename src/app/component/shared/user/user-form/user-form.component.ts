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
import { Router } from '@angular/router';
import { AddressPayload } from 'src/app/payload/address/address.payload';
import { ContactPayload } from 'src/app/payload/contact/contact.payload';
import { IndividualTypePayload } from 'src/app/payload/individualType/individual-type.payload';
import { UserPayload } from 'src/app/payload/user/user.payload';
import { IndividualTypeService } from 'src/app/service/individualType/individual-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { UserService } from 'src/app/service/user/user.service';
import { AppRoutes } from 'src/app/utils/appRoutes';
import { FormValidation } from 'src/app/utils/formValidation';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnChanges {
  // Form.
  userForm: FormGroup;
  hidePassword = true;
  hideCurrentPassword = true;
  formValidation = FormValidation;
  // Values sent to the child component.
  @Input() userInput: UserPayload | null; // If we are modifying a user, we pass the user
  @Input() apiError: any = null;
  @Input() updateCurrentUser = false;
  @Output() userOutput = new EventEmitter<UserPayload>();
  @Output() refreshOutput = new EventEmitter<void>();
  userData: UserPayload;
  // Select data
  individualTypes: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private individualTypeService: IndividualTypeService,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {
    this.userForm = this.formBuilder.group({});
    this.userInput = null;
    this.userData = this.resetUserData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadUser();
  }
  ngOnInit(): void {
    let controls: any = {
      password: [
        this.userData.password,
        [Validators.required, Validators.minLength(6)],
      ],
      type: [this.userData.individual.type, Validators.required],
      name: [this.userData.individual.name, Validators.required],
      code: [this.userData.individual.code, Validators.required],
      notes: [this.userData.individual.notes],
    };
    // If we're updating the user that is currently logged in, we need to confirm its password.
    if (this.updateCurrentUser) {
      controls = {
        ...controls,
        currentPassword: [, Validators.required],
      };
    } else {
      controls = {
        ...controls,
        username: [
          this.userData.username,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ],
        ],
      };
    }
    // Inserts the default values in the form.
    this.userForm = this.formBuilder.group(controls);

    // Loads the individual types into the select component.
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
  }
  loadUser() {
    // If we are updating the user, we load the values received from the parent component.
    if (this.userInput !== null) {
      this.userData = {
        ...this.userInput,
        individual: {
          ...this.userInput.individual,
        },
      };

      this.resetForm();
    }
  }
  /**
   * Submits form to parent component.
   *  */
  submit() {
    if (this.userForm.valid) {
      // Takes the existent information about the user and replaces the fields with the output on the form.
      let user: UserPayload = {
        ...this.userData,
        username: this.userForm.get('username')?.value,
        password: this.userForm.get('password')?.value,
        individual: {
          ...this.userData.individual,
          type: this.userForm.get('type')?.value,
          name: this.userForm.get('name')?.value,
          code: this.userForm.get('code')?.value,
          notes: this.userForm.get('notes')?.value,
        },
      };
      // If we're updating the user that is currently logged in, we have to add the current password.
      if (this.updateCurrentUser) {
        user = {
          ...user,
          currentPassword: this.userForm.get('currentPassword')?.value,
        };
      }
      // We pass the user to the parent component.
      this.userOutput.next(user);
    }
  }
  receiveContactsOutput(contacts: ContactPayload[]) {
    // Takes the user info and replaces the contacts.
    this.userData = {
      ...this.userData,
      individual: {
        ...this.userData.individual,
        contacts, // contacts: contacts
      },
    };
  }
  receiveAddressOutput(addresses: AddressPayload[]) {
    // Takes the user info and replaces the addresses.
    this.userData = {
      ...this.userData,
      individual: {
        ...this.userData.individual,
        addresses,
      },
    };
  }
  resetForm() {
    this.userForm.reset();
    this.userForm.markAsUntouched();
    if (this.userInput !== null) {
      this.userData = {
        ...this.userInput,
        individual: {
          ...this.userInput.individual,
        },
      };
    } else {
      this.userData = this.resetUserData();
    }
    // Reset the data in the form.
    this.userForm.get('username')?.setValue(this.userData.username);
    this.userForm.get('password')?.setValue(this.userData.password);
    this.userForm.get('type')?.setValue(this.userData.individual.type);
    this.userForm.get('name')?.setValue(this.userData.individual.name);
    this.userForm.get('code')?.setValue(this.userData.individual.code);
    this.userForm.get('notes')?.setValue(this.userData.individual.notes);
  }
  resetUserData() {
    return {
      username: '',
      password: '',
      individual: {
        name: '',
        code: '',
        notes: '',
        type: '',
        addresses: [],
        contacts: [],
      },
    };
  }
  switchUser(field: string) {
    if (this.userInput) {
      if (field === 'role') {
        // Switch role.
        this.userService.switchRole(this.userInput).subscribe(
          () => {
            this.snackbarService.show('Status changed');
            this.refreshOutput.next();
          },
          (error) => {
            this.apiError = error;
            this.snackbarService.show(error);
          }
        );
      } else if (field === 'status') {
        // Switch status.
        this.userService.switchStatus(this.userInput).subscribe(
          () => {
            this.snackbarService.show('Role changed');
            this.refreshOutput.next();
          },
          (error) => {
            this.apiError = error;
            this.snackbarService.show(error);
          }
        );
      }
    }
  }
}
