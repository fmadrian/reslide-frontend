import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPayload } from 'src/app/payload/user/user.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  create(payload: UserPayload){
    return this.httpClient.post(ApiRoutes.auth.createUser, payload)
  }
}
