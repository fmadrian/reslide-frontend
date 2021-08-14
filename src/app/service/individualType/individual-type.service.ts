import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndividualTypePayload } from 'src/app/payload/individualType/individual-type.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class IndividualTypeService {

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<IndividualTypePayload[]>(ApiRoutes.individualType.getAll);
  }
}
