import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductBrandPayload } from 'src/app/payload/productBrand/product-brand.payload';
import { ProductBrandService } from 'src/app/service/productBrand/product-brand.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-update-product-brand',
  templateUrl: './update-product-brand.component.html',
  styleUrls: ['./update-product-brand.component.scss'],
})
export class UpdateProductBrandComponent implements OnInit {
  apiError: ApiError | null = null;
  retrieveError: ApiError | null = null;
  productBrandInput: ProductBrandPayload | null = null;
  id = 0;
  constructor(
    private productBrandService: ProductBrandService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // Get the id from the params
    this.id = this.activateRoute.snapshot.params.id;
    this.get();
  }

  update(productBrand: ProductBrandPayload) {
    this.productBrandService.update(productBrand).subscribe(
      (data) => {
        this.snackbarService.show('Product brand updated');
        this.apiError = null;
      },
      (error) => {
        this.apiError = ApiErrorMessage(error);
        this.snackbarService.show(error);
      }
    );
  }
  get() {
    this.productBrandService.get(this.id).subscribe(
      (data) => {
        this.productBrandInput = data;
        this.retrieveError = null;
      },
      (error) => {
        this.productBrandInput = null;
        this.retrieveError = ApiErrorMessage(error);
      }
    );
  }
  refresh() {
    this.get();
  }
}
