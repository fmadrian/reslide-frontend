import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductPayload } from 'src/app/payload/product/product.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  create(payload: ProductPayload) {
    return this.httpClient.post(ApiRoutes.product.create, payload);
  }
  search(name = '', code = '', brand = '', type = '', status = '') {
    let query = {};
    query = { ...query, name, code };
    if (brand.trim() !== '') {
      query = {
        ...query,
        brand,
      };
    }
    if (type.trim() !== '') {
      query = {
        ...query,
        type,
      };
    }
    if (status.trim() !== '') {
      query = {
        ...query,
        status,
      };
    }
    return this.httpClient.get<ProductPayload[]>(ApiRoutes.product.search, {
      params: { ...query },
    });
  }

  get(id: number) {
    return this.httpClient.get<ProductPayload>(ApiRoutes.product.get, {
      params: { id },
    });
  }
  update(payload: ProductPayload) {
    return this.httpClient.put(ApiRoutes.product.update, payload);
  }
  searchLessOrEqual(quantity: number) {
    return this.httpClient.get<ProductPayload[]>(
      ApiRoutes.product.searchLessOrEqual,
      {
        params: { quantity },
      }
    );
  }
}
