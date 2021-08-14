import { Component, EventEmitter, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { LoginRequest } from 'src/app/payload/auth/login/login.request';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean; // is the password hidden
  errorMessage: string;

  loginForm : FormGroup;
  loginRequest : LoginRequest

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { 
    this.hidePassword = true;
    this.errorMessage =  '';

    /*this.loginForm = new FormGroup({
      username : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });*/
    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    })
    
    this.loginRequest = {
      username : '',
      password : ''
    }
  }

  ngOnInit(): void {   
  }
  
  switchPassword(){
    this.hidePassword = !this.hidePassword;
  }

  login(){
      this.loginRequest.password = this.loginForm.get('password')?.value;
      this.loginRequest.username = this.loginForm.get('username')?.value;
      // If everything is okay, redirects to landing.
      this.authService.login(this.loginRequest)
      .subscribe( (data) =>{
        this.router.navigateByUrl(AppRoutes.landing);
      },
      (error)=>{
        this.errorMessage = error;
      });
  }
}
