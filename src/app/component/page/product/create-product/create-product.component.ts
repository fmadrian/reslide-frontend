import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductPayload } from 'src/app/payload/product/product.payload';
import { ProductService } from 'src/app/service/product/product.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  apiError: ApiError | null = null;
  constructor(
    private productService: ProductService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}
  create(product: ProductPayload) {
    this.productService.create(product).subscribe(
      (data) => {
        this.snackbarService.show('Individual created');
        this.apiError = null;
      },
      (error) => {
        this.apiError = ApiErrorMessage(error.error);
        this.snackbarService.show(error.error.message);
      }
    );
  }
}
