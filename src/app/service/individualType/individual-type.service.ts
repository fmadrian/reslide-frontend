import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndividualTypePayload } from 'src/app/payload/individualType/individual-type.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class IndividualTypeService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<IndividualTypePayload[]>(
      ApiRoutes.individualType.getAll
    );
  }
  create(payload: IndividualTypePayload) {
    return this.httpClient.post<IndividualTypePayload>(
      ApiRoutes.individualType.create,
      payload
    );
  }
  update(payload: IndividualTypePayload) {
    return this.httpClient.put(ApiRoutes.individualType.update, payload);
  }
  deactivate(payload: IndividualTypePayload) {
    return this.httpClient.put(ApiRoutes.individualType.switchStatus, payload);
  }
  get(id: number) {
    return this.httpClient.get<IndividualTypePayload>(
      ApiRoutes.individualType.get(id)
    );
  }
}
