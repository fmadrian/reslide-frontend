import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderPayload } from 'src/app/payload/order/order.payload';
import { OrderService } from 'src/app/service/order/order.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ApiError } from 'src/app/utils/apiErrorMessages';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss'],
})
export class UpdateOrderComponent implements OnInit {
  apiError: ApiError | null = null;
  orderInput: OrderPayload | null = null;
  id = 0; // Id of the order to be modified.
  error: string | null = null;
  constructor(
    private orderService: OrderService,
    private snackbarService: SnackbarService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Get the individual using the code passed in the parameters (query parameters).
    this.id = this.activateRoute.snapshot.params.id;
    this.getOrder();
  }
  update(order: OrderPayload) {
    this.orderService.update(order).subscribe(
      (data) => {
        this.snackbarService.show('Order updated');
        this.apiError = null;
        this.router.navigateByUrl(AppRoutes.order.view_id(this.id));
      },
      (error) => {
        this.apiError = error; // We pass it to the child component
        this.snackbarService.show(error);
      }
    );
  }
  getOrder() {
    this.orderService.get(this.id).subscribe(
      (data) => {
        this.orderInput = data;
        this.error = null;
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }
}
