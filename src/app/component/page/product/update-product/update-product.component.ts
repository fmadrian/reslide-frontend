import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductPayload } from 'src/app/payload/product/product.payload';
import { ProductService } from 'src/app/service/product/product.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError, ApiErrorMessage } from 'src/app/utils/apiErrorMessages';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  productId: number; // id received
  product: ProductPayload | null; // Product retrieved.
  apiError: ApiError | null; // Error while executing an API request.
  retrieveError: ApiError | null; // Error while retrieving the data.
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private snackbarService: SnackbarService
  ) {
    this.productId = 0;
    this.product = null;
    this.apiError = null;
    this.retrieveError = null;
  }

  ngOnInit() {
    // Get the product id and pass it.
    this.productId = this.activateRoute.snapshot.params.id;
    this.productService.get(this.productId).subscribe(
      (data) => {
        this.product = data;
      },
      (error) => {
        this.retrieveError = ApiErrorMessage(error.error);
      }
    );
  }

  update(product: ProductPayload) {
    this.productService.update(product).subscribe(
      (data) => {
        this.snackbarService.show('Product updated');
        this.apiError = null;
      },
      (error) => {
        this.apiError = ApiErrorMessage(error); // We pass it to the child component
        this.snackbarService.show(error);
      }
    );
  }
}
