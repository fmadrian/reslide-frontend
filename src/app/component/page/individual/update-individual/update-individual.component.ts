import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { IndividualService } from 'src/app/service/individual/individual.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-update-individual',
  templateUrl: './update-individual.component.html',
  styleUrls: ['./update-individual.component.scss'],
})
export class UpdateIndividualComponent implements OnInit {
  apiError: ApiError | null = null;
  individualInput: IndividualPayload | null = null;
  id = 0; // Id of the individual to be modified.
  error: string | null = null; // Error while searching for the individual.
  constructor(
    private individualService: IndividualService,
    private snackbarService: SnackbarService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1. Get the individual using the code passed in the parameters (query parameters).
    this.id = this.activateRoute.snapshot.params.id;
    this.individualService.get(this.id).subscribe(
      (data) => {
        this.individualInput = data;
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }
  updateIndividual(individual: IndividualPayload) {
    this.individualService.update(individual).subscribe(
      (data) => {
        this.snackbarService.show('Individual updated');
        this.apiError = null;
      },
      (error) => {
        this.apiError = ApiErrorMessage(error.error); // We pass it to the child component
        this.snackbarService.show(error.error.message);
      }
    );
  }
}
