import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeasurementTypePayload } from 'src/app/payload/measurementType/measurement-type.payload';
import { MeasurementTypeService } from 'src/app/service/measurementType/measurement-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-create-measurement-type',
  templateUrl: './create-measurement-type.component.html',
  styleUrls: ['./create-measurement-type.component.scss'],
})
export class CreateMeasurementTypeComponent implements OnInit {
  apiError: ApiError | null;
  constructor(
    private router: Router,
    private measurementTypeService: MeasurementTypeService,
    private snackbarService: SnackbarService
  ) {
    this.apiError = null;
  }

  ngOnInit(): void {}

  create(measurementType: MeasurementTypePayload) {
    this.measurementTypeService.create(measurementType).subscribe(
      (data) => {
        this.snackbarService.show('Measurement type created.');
        if (data.id) {
          this.router.navigateByUrl(
            AppRoutes.measurementType.update_id(data.id)
          );
        }
      },
      (error) => {
        this.apiError = ApiErrorMessage(error);
        this.snackbarService.show(error);
      }
    );
  }
}
