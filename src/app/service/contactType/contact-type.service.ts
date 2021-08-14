import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactTypePayload } from 'src/app/payload/contactType/contact-type.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class ContactTypeService {

  constructor(private httpClient : HttpClient) { }

  getAll(){
    return this.httpClient.get<ContactTypePayload[]>(ApiRoutes.contactType.search);
  }
  search(type : string){
    let requestParams = new HttpParams().set('type', type);
    return this.httpClient.get<ContactTypePayload[]>(ApiRoutes.contactType.search, {params: requestParams});
  }
  create(payload: ContactTypePayload){
    return this.httpClient.post(ApiRoutes.contactType.create, payload);
  }
}
