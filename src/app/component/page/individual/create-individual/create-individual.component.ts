import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { IndividualService } from 'src/app/service/individual/individual.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-create-individual',
  templateUrl: './create-individual.component.html',
  styleUrls: ['./create-individual.component.scss'],
})
export class CreateIndividualComponent implements OnInit {
  apiError: ApiError | null = null;
  constructor(
    private individualService: IndividualService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  createIndividual(individual: IndividualPayload) {
    this.individualService.create(individual).subscribe(
      (data) => {
        this.snackbarService.show('Individual created');
        this.apiError = null;
        if (data.id) {
          this.router.navigateByUrl(AppRoutes.individual.update_id(data.id));
        }
      },
      (error) => {
        this.apiError = ApiErrorMessage(error); // We pass it to the child component
        this.snackbarService.show(error);
      }
    );
  }
}
