import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-internal-error',
  templateUrl: './internal-error.component.html',
  styleUrls: ['./internal-error.component.scss'],
})
export class InternalErrorComponent implements OnInit {
  error = ' Internal error ';
  message = 'Sorry, something unexpected has happened.';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.error && params.message) {
        this.error = params.error;
        this.message = params.message;
      }
    });
  }
  goToLanding() {
    this.router.navigateByUrl(AppRoutes.landing);
  }
  goBack() {
    this.location.back();
  }
}
