import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouteReuseStrategy } from '@angular/router';
import { LoginRequest } from 'src/app/payload/auth/login/login.request';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { UserPayload } from 'src/app/payload/user/user.payload';
import { UserService } from 'src/app/service/user/user.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  apiError : (ApiError | null) = null;
  constructor(private userService: UserService, private _snackBar: MatSnackBar, private router: Router) { 
    
  }

  ngOnInit(): void {
   
  }
  createUser(user : UserPayload){
    this.userService.create(user).subscribe(
      (data)=>{
        this._snackBar.open('User created', 'OK', {duration: 3000});
        this.apiError = null;
      },(error)=>{
        this.apiError = ApiErrorMessage(error.error);
        this._snackBar.open(error.error.message, 'OK', {duration: 3000});
      }
    )
  } 
}
