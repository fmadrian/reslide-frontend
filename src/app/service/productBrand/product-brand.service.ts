import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductBrandPayload } from 'src/app/payload/productBrand/product-brand.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class ProductBrandService {

  constructor(private httpClient: HttpClient) { }
  search(query = ''){
    return this.httpClient.get<ProductBrandPayload[]>(ApiRoutes.productBrand.search, {params: {query}})
  }
}
