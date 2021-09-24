import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetailPayload } from 'src/app/payload/orderDetail/order-detail.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  constructor(private httpClient: HttpClient) {}

  create(payload: OrderDetailPayload) {
    return this.httpClient.post(ApiRoutes.orderDetail.create, payload);
  }
  delete(orderId: number, detailId: number) {
    return this.httpClient.delete<any>(
      ApiRoutes.orderDetail.delete(orderId, detailId)
    );
  }
  switchStatus(payload: OrderDetailPayload) {
    // Insert the into status
    let status = payload.status;
    if (status === 'DELIVERED') {
      status = 'RETURNED';
    } else {
      status = 'DELIVERED';
    }
    // Change the status
    payload = { ...payload, status };
    return this.httpClient.put(ApiRoutes.orderDetail.switchState, payload);
  }
}
