import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { OrderPayload } from 'src/app/payload/order/order.payload';
import { OrderService } from 'src/app/service/order/order.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  apiError: ApiError | null = null;
  constructor(
    private orderService: OrderService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  createOrder(order: OrderPayload) {
    this.orderService.create(order).subscribe(
      (data) => {
        this.snackbarService.show('Order created');
        if (data.id) {
          this.router.navigateByUrl(AppRoutes.order.view_id(data.id));
        } else {
          throwError(`Order didn't return id`);
        }
        this.apiError = null;
      },
      (error) => {
        this.apiError = error;
        this.snackbarService.show(error);
      }
    );
  }
}
