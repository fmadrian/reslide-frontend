import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactTypePayload } from 'src/app/payload/contactType/contact-type.payload';
import { ContactTypeService } from 'src/app/service/contactType/contact-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-update-contact-type',
  templateUrl: './update-contact-type.component.html',
  styleUrls: ['./update-contact-type.component.scss'],
})
export class UpdateContactTypeComponent implements OnInit {
  contactType: ContactTypePayload | null = null;
  id = 0;
  apiError: ApiError | null = null;
  error: string | null = null;

  constructor(
    private contactTypeService: ContactTypeService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.refresh();
  }
  refresh() {
    this.contactTypeService.get(this.id).subscribe(
      (data) => {
        this.contactType = data;
      },
      (error) => {
        this.error = error;
      }
    );
  }
  update(contactType: ContactTypePayload) {
    this.contactTypeService.update(contactType).subscribe(
      () => {
        this.snackbarService.show('Contact type updated');
      },
      (error) => {
        this.apiError = error;
        this.snackbarService.show(error);
      }
    );
  }
}
