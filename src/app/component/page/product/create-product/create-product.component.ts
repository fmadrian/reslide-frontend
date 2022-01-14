import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductPayload } from 'src/app/payload/product/product.payload';
import { ProductService } from 'src/app/service/product/product.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  apiError: ApiError | null = null;
  constructor(
    private productService: ProductService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  create(product: ProductPayload) {
    this.productService.create(product).subscribe(
      (data) => {
        this.snackbarService.show('Product created');
        this.apiError = null;
        if (data.id) {
          this.router.navigateByUrl(AppRoutes.product.update_id(data.id));
        }
      },
      (error) => {
        this.apiError = ApiErrorMessage(error);
        this.snackbarService.show(error);
      }
    );
  }
}
