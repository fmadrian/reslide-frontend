import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndividualTypePayload } from 'src/app/payload/individualType/individual-type.payload';
import { IndividualTypeService } from 'src/app/service/individualType/individual-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-update-individual-type',
  templateUrl: './update-individual-type.component.html',
  styleUrls: ['./update-individual-type.component.scss'],
})
export class UpdateIndividualTypeComponent implements OnInit {
  individualTypeInput: IndividualTypePayload | null = null;

  apiError: ApiError | null = null;
  error: ApiError | null = null;
  id: number | null = null;
  constructor(
    private individualTypeService: IndividualTypeService,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getIndividualType();
  }
  updateIndividualType(individualType: IndividualTypePayload) {
    this.individualTypeService.update(individualType).subscribe(
      () => {
        this.snackbarService.show('Updated.');
        this.apiError = null;
      },
      (error) => {
        this.apiError = error;
      }
    );
  }
  getIndividualType() {
    // We need an id to get the individual type.
    if (this.id) {
      this.individualTypeService.get(this.id).subscribe(
        (data) => {
          this.individualTypeInput = data;
          this.error = null;
        },
        (error) => {
          this.error = error;
        }
      );
    }
  }
}
