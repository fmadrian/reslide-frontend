import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderPayload } from 'src/app/payload/order/order.payload';
import { OrderService } from 'src/app/service/order/order.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  @Input() order: OrderPayload;
  error: string | null = null;
  id: number | null = null;
  constructor(
    private activateRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {
    this.order = {
      providerName: '',
      providerCode: '',
      details: [],
      status: '',
      transaction: {
        date: '',
        notes: '',
        payments: [],
        username: '',
      },
    };
  }

  ngOnInit(): void {
    // 1. Get the individual using the code passed in the parameters (query parameters).
    this.id = this.activateRoute.snapshot.params.id;
    this.getOrder();
  }
  getOrder() {
    if (this.id) {
      this.orderService.get(this.id).subscribe(
        (data) => {
          this.order = data;
          this.error = null;
        },
        (error) => {
          this.error = error;
        }
      );
    }
  }
  update() {
    if (this.order.id) {
      this.router.navigateByUrl(AppRoutes.order.update_id(this.order.id));
    }
  }
}
