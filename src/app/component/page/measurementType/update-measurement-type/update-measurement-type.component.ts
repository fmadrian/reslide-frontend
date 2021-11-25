import { Component, OnInit } from '@angular/core';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';
import { MeasurementTypePayload } from 'src/app/payload/measurementType/measurement-type.payload';
import { MeasurementTypeService } from 'src/app/service/measurementType/measurement-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-measurement-type',
  templateUrl: './update-measurement-type.component.html',
  styleUrls: ['./update-measurement-type.component.scss'],
})
export class UpdateMeasurementTypeComponent implements OnInit {
  apiError: ApiError | null = null;
  retrieveError: ApiError | null = null;
  measurementTypeInput: MeasurementTypePayload | null = null;
  constructor(
    private measurementTypeService: MeasurementTypeService,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.measurementTypeService.get(id).subscribe(
      (data) => {
        this.measurementTypeInput = data;
      },
      (error) => {
        this.retrieveError = ApiErrorMessage(error);
      }
    );
  }
  update(measurementType: MeasurementTypePayload) {
    this.measurementTypeService.update(measurementType).subscribe(
      (data) => {
        this.snackbarService.show('Measurement type updated.');
        this.apiError = null;
      },
      (error) => {
        this.apiError = ApiErrorMessage(error);
        this.snackbarService.show(error);
      }
    );
  }
}
