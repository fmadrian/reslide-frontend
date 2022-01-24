import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductTypePayload } from 'src/app/payload/productType/product-type.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {
  constructor(private httpClient: HttpClient) {}
  search(type = '') {
    return this.httpClient.get<ProductTypePayload[]>(
      ApiRoutes.productType.search,
      { params: { type } }
    );
  }
  create(payload: ProductTypePayload) {
    return this.httpClient.post<ProductTypePayload>(
      ApiRoutes.productType.create,
      payload
    );
  }
  update(payload: ProductTypePayload) {
    return this.httpClient.put(ApiRoutes.productType.update, payload);
  }
  get(id: number) {
    return this.httpClient.get<ProductTypePayload>(
      ApiRoutes.productType.get(id)
    );
  }
  switchStatus(payload: ProductTypePayload) {
    return this.httpClient.put(ApiRoutes.productType.switchStatus, payload);
  }
}
