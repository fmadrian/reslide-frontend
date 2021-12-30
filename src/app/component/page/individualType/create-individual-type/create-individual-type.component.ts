import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualTypePayload } from 'src/app/payload/individualType/individual-type.payload';
import { IndividualTypeService } from 'src/app/service/individualType/individual-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-create-individual-type',
  templateUrl: './create-individual-type.component.html',
  styleUrls: ['./create-individual-type.component.scss'],
})
export class CreateIndividualTypeComponent implements OnInit {
  apiError: ApiError | null = null;
  constructor(
    private individualTypeService: IndividualTypeService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createIndividualType(individualType: IndividualTypePayload) {
    this.individualTypeService.create(individualType).subscribe(
      (data) => {
        if (data && data.id) {
          this.router.navigateByUrl(
            AppRoutes.individualType.update_id(data.id)
          );
          this.snackbarService.show('Individual type created');
          this.apiError = null;
        }
      },
      (error) => {
        this.snackbarService.show(error);
        this.apiError = error;
      }
    );
  }
}
