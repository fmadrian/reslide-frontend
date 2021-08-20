import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductTypePayload } from 'src/app/payload/productType/product-type.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private httpClient: HttpClient) { }
  search(type = ''){
    return this.httpClient.get<ProductTypePayload[]>(ApiRoutes.productType.search, {params:{type}})
  }
}
