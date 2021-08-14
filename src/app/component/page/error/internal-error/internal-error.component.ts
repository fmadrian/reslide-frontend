import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-internal-error',
  templateUrl: './internal-error.component.html',
  styleUrls: ['./internal-error.component.scss']
})
export class InternalErrorComponent implements OnInit {

  constructor(private router: Router, private location : Location) { }

  ngOnInit(): void {
  }
  goToLanding(){
    this.router.navigateByUrl(AppRoutes.landing);
  }
  goBack(){
    this.location.back();
  }
}
