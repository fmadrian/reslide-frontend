import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductTypePayload } from 'src/app/payload/productType/product-type.payload';
import { ProductTypeService } from 'src/app/service/productBrand/product-type.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-create-product-type',
  templateUrl: './create-product-type.component.html',
  styleUrls: ['./create-product-type.component.scss'],
})
export class CreateProductTypeComponent implements OnInit {
  apiError: ApiError | null = null;
  constructor(
    private productTypeService: ProductTypeService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  create(productType: ProductTypePayload) {
    this.productTypeService.create(productType).subscribe(
      (data) => {
        // Should receive the product brand back with its id.
        this.snackbarService.show('Product type created');
        this.apiError = null;
        // It redirects to the update page using the id of the brand.
        if (data.id) {
          this.router.navigateByUrl(AppRoutes.productType.update_id(data.id));
          this.apiError = null;
        }
      },
      (error) => {
        this.apiError = ApiErrorMessage(error);
        this.snackbarService.show(error);
      }
    );
  }
}
