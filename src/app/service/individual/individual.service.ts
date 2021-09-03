import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { IndividualPayload } from 'src/app/payload/individual/individual.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Injectable({
  providedIn: 'root',
})
export class IndividualService {
  constructor(private httpClient: HttpClient) {}

  create(payload: IndividualPayload) {
    return this.httpClient.post(ApiRoutes.individual.create, payload);
  }
  update(payload: IndividualPayload) {
    return this.httpClient.put(ApiRoutes.individual.update, payload);
  }
  get(id: number) {
    return this.httpClient.get<IndividualPayload>(ApiRoutes.individual.get, {
      params: { id },
    });
  }
  search(query: string = '') {
    // share() transforms the cold observable into a hot one.
    // in a hot observable the same results can be shared among different subscribers (if they subscribe before certain time has passed)
    return this.httpClient
      .get<IndividualPayload[]>(ApiRoutes.individual.search, {
        params: { query },
      })
      .pipe(share());
  }
}
