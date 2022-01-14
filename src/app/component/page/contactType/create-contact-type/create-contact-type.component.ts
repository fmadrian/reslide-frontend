import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactTypePayload } from 'src/app/payload/contactType/contact-type.payload';
import { ContactTypeService } from 'src/app/service/contactType/contact-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-create-contact-type',
  templateUrl: './create-contact-type.component.html',
  styleUrls: ['./create-contact-type.component.scss'],
})
export class CreateContactTypeComponent implements OnInit {
  apiError: ApiError | null = null;

  constructor(
    private router: Router,
    private contactTypeService: ContactTypeService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  create(contactType: ContactTypePayload) {
    this.contactTypeService.create(contactType).subscribe(
      (data) => {
        if (data.id) {
          this.snackbarService.show('Contact type created.');
          this.router.navigateByUrl(AppRoutes.contactType.update_id(data.id));
        }
      },
      (error) => {
        this.snackbarService.show(error);
        this.apiError = ApiErrorMessage(error);
      }
    );
  }
}
