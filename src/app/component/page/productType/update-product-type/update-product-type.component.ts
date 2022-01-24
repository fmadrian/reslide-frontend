import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductTypePayload } from 'src/app/payload/productType/product-type.payload';
import { ProductTypeService } from 'src/app/service/productBrand/product-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-update-product-type',
  templateUrl: './update-product-type.component.html',
  styleUrls: ['./update-product-type.component.scss'],
})
export class UpdateProductTypeComponent implements OnInit {
  apiError: ApiError | null = null;
  retrieveError: ApiError | null = null;
  productTypeInput: ProductTypePayload | null = null;
  id = 0;
  constructor(
    private productTypeService: ProductTypeService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // Get the id from the params
    this.id = this.activateRoute.snapshot.params.id;
    this.get();
  }

  update(productType: ProductTypePayload) {
    this.productTypeService.update(productType).subscribe(
      (data) => {
        this.snackbarService.show('Product type updated');
        this.apiError = null;
      },
      (error) => {
        this.apiError = ApiErrorMessage(error);
        this.snackbarService.show(error);
      }
    );
  }
  get() {
    this.productTypeService.get(this.id).subscribe(
      (data) => {
        this.productTypeInput = data;
        this.retrieveError = null;
      },
      (error) => {
        this.productTypeInput = null;
        this.retrieveError = ApiErrorMessage(error);
      }
    );
  }
}
