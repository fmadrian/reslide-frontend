import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPayload } from 'src/app/payload/user/user.payload';
import { ApiRoutes } from 'src/app/utils/apiRoutes';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  create(payload: UserPayload) {
    return this.httpClient.post<UserPayload>(ApiRoutes.user.create, payload);
  }
  getInformation() {
    return this.httpClient.get<UserPayload>(ApiRoutes.user.getUserInformation);
  }
  getUser(id: number) {
    return this.httpClient.get<UserPayload>(ApiRoutes.user.getUser(id));
  }
  updateCurrentUser(payload: UserPayload) {
    return this.httpClient.put<any>(ApiRoutes.user.updateCurrentUser, payload);
  }
  updateUser(id: number, payload: UserPayload) {
    return this.httpClient.put<any>(ApiRoutes.user.updateUser(id), payload);
  }
  search(username: string) {
    return this.httpClient.get<UserPayload[]>(ApiRoutes.user.search, {
      params: { username },
    });
  }
  switchStatus(payload: UserPayload) {
    return this.httpClient.put(ApiRoutes.user.switchStatus, payload);
  }
  switchRole(payload: UserPayload) {
    return this.httpClient.put(ApiRoutes.user.switchRole, payload);
  }
}
