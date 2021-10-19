import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { OrderPayload } from 'src/app/payload/order/order.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';
import { DateService } from '../date/date.service';
import { NumberService } from '../number/number.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private dateService: DateService,
    private numberService: NumberService
  ) {}
  create(payload: OrderPayload) {
    return this.httpClient.post<OrderPayload>(ApiRoutes.order.create, payload);
  }
  update(payload: OrderPayload) {
    return this.httpClient.put(ApiRoutes.order.update, payload);
  }
  get(id: number) {
    return this.httpClient.get<OrderPayload>(ApiRoutes.order.get(id));
  }
  switchStatus(payload: OrderPayload) {
    return this.httpClient.put<any>(ApiRoutes.order.switchStatus, payload);
  }
  search(
    start_date: string,
    end_date: string,
    providerCode = '',
    start_expected_delivery_date: string | null = null,
    end_expected_delivery_date: string | null = null,
    start_actual_delivery_date: string | null = null,
    end_actual_delivery_date: string | null = null
  ) {
    let params = {};
    // Add provider code
    params = { start_date, end_date, providerCode };
    // Add delivery dates if they are there.
    if (start_actual_delivery_date && end_actual_delivery_date) {
      params = {
        ...params,
        start_actual_delivery_date,
        end_actual_delivery_date,
      };
    }
    if (start_expected_delivery_date && end_expected_delivery_date) {
      params = {
        ...params,
        start_expected_delivery_date,
        end_expected_delivery_date,
      };
    }
    // Do the API call.
    return this.httpClient.get<OrderPayload[]>(ApiRoutes.order.search, {
      params,
    });
  }
  deliverAllProducts(payload: OrderPayload) {
    return this.httpClient.put<any>(
      ApiRoutes.order.deliverAllProducts,
      payload
    );
  }
  search2(
    start: string,
    end: string,
    providerCode: string,
    expectedStart = '',
    expectedEnd = '',
    actualStart = '',
    actualEnd = ''
  ) {
    return this.httpClient.get<OrderPayload[]>(ApiRoutes.order.search);
  }

  resetOrder(orderInput: OrderPayload | null) {
    let result: OrderPayload;
    if (!orderInput) {
      result = {
        details: [],
        providerCode: '',
        providerName: '',
        transaction: {
          username: '',
          date: this.dateService.getISOString(new Date()),
          notes: '',
          payments: [],
        },
        status: 'ACTIVE',
        total: 0,
        paid: 0,
        owed: 0,
      };
    } else {
      result = {
        ...orderInput,
      };
    }
    return result;
  }
  getOrderPreview(
    order: OrderPayload,
    provider: IndividualPayload | null,
    date: Date,
    expectedDeliveryDate: Date,
    actualDeliveryDate: Date,
    status: string,
    notes: string
  ) {
    if (!order.id) {
      // 1. Get the total in each detail.
      // 2. Filter them to avoid undefined values.
      // 3. Add them and return the total
      const total = order.details
        .map((detail) => this.numberService.numberFilter(detail.total))
        .reduce(this.numberService.add, 0);
      const paid = order.transaction.payments
        .map((payment) => this.numberService.numberFilter(payment.paid))
        .reduce(this.numberService.add, 0);

      order = {
        details: order.details,
        providerCode: provider ? provider.code : '',
        providerName: provider ? provider.name : '',
        transaction: {
          username: '',
          date: this.dateService.getISOString(date),
          notes,
          payments: order.transaction.payments,
        },
        status,
        total,
        paid,
        owed: parseFloat((total - paid).toFixed(2)),
      };
    }
    if (actualDeliveryDate && actualDeliveryDate !== null) {
      order.actualDeliveryDate =
        this.dateService.getISOString(actualDeliveryDate);
    } else {
      delete order.actualDeliveryDate;
    }
    if (expectedDeliveryDate && expectedDeliveryDate !== null) {
      order.expectedDeliveryDate =
        this.dateService.getISOString(expectedDeliveryDate);
    } else {
      delete order.expectedDeliveryDate;
    }
    return order;
  }
}
