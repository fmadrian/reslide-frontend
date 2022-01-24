import { Component, OnInit } from '@angular/core';
import { UserPayload } from 'src/app/payload/user/user.payload';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { UserService } from 'src/app/service/user/user.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-update-current-user',
  templateUrl: './update-current-user.component.html',
  styleUrls: ['./update-current-user.component.scss'],
})
export class UpdateCurrentUserComponent implements OnInit {
  apiError: ApiError | null = null;
  user: UserPayload | null = null;
  id = 0; // Id of the user to be modified.
  error: string | null = null; // Error while searching for the user.
  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.userService.getInformation().subscribe(
      (data) => {
        this.user = data;
        this.error = null;
        this.apiError = null;
      },
      (error) => {
        this.user = null;
        this.error = error;
      }
    );
  }

  updateCurrentUser(user: UserPayload) {
    this.userService.updateCurrentUser(user).subscribe(
      (data) => {
        this.snackbarService.show(data.message);
        this.apiError = null;
      },
      (error) => {
        this.snackbarService.show(error);
        this.apiError = ApiErrorMessage(error);
      }
    );
  }
}
