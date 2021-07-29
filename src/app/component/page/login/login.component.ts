import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean; // is the password hidden
  error: any; // object used to represent the error on the component (if there is one)

  loginForm : FormGroup;

  constructor() { 
    this.error = {
      active : false,
      message : ''
    };
    this.hidePassword = true;

    this.loginForm = new FormGroup({
      username : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });
  }
  
  switchPassword(){
    this.hidePassword = !this.hidePassword;
  }
}
