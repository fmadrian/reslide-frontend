import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPayload } from 'src/app/payload/user/user.payload';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { UserService } from 'src/app/service/user/user.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  apiError: ApiError | null = null;
  user: UserPayload | null = null;
  id = 0; // Id of the user to be modified.
  error: string | null = null; // Error while searching for the user.
  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.id).subscribe(
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
  updateUser(user: UserPayload) {
    this.userService.updateUser(this.id, user).subscribe(
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
