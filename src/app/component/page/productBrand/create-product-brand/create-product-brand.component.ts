import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductBrandPayload } from 'src/app/payload/productBrand/product-brand.payload';
import { ProductBrandService } from 'src/app/service/productBrand/product-brand.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-create-product-brand',
  templateUrl: './create-product-brand.component.html',
  styleUrls: ['./create-product-brand.component.scss'],
})
export class CreateProductBrandComponent implements OnInit {
  apiError: ApiError | null = null;
  constructor(
    private productBrandService: ProductBrandService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  create(productBrand: ProductBrandPayload) {
    this.productBrandService.create(productBrand).subscribe(
      (data) => {
        // Should receive the product brand back with its id.
        this.snackbarService.show('Product brand created');
        this.apiError = null;
        // It redirects to the update page using the id of the brand.
        if (data.id) {
          this.router.navigateByUrl(AppRoutes.productBrand.update_id(data.id));
        }
      },
      (error) => {
        this.apiError = ApiErrorMessage(error);
        this.snackbarService.show(error);
      }
    );
  }
}
