import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { MeasurementTypePayload } from 'src/app/payload/measurementType/measurement-type.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class MeasurementTypeService {
  constructor(private httpClient: HttpClient) {}

  search(type: string = '') {
    return this.httpClient
      .get<MeasurementTypePayload[]>(ApiRoutes.measurementType.search, {
        params: { type },
      })
      .pipe(share());
  }
  create(payload: MeasurementTypePayload) {
    return this.httpClient.post<MeasurementTypePayload>(
      ApiRoutes.measurementType.create,
      payload
    );
  }
  update(payload: MeasurementTypePayload) {
    return this.httpClient.put<MeasurementTypePayload>(
      ApiRoutes.measurementType.update,
      payload
    );
  }
  get(id: number) {
    return this.httpClient.get<MeasurementTypePayload>(
      ApiRoutes.measurementType.get(id)
    );
  }
  switchStatus(payload: MeasurementTypePayload) {
    return this.httpClient.put(ApiRoutes.measurementType.switchStatus, payload);
  }
}
