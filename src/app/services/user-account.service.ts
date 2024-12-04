import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  UserAccountCreate,
  UserAccountGetAndUpdate,
  UserAccountList,
} from '../Models/interface/userAccount.model';
import { Constant } from '../constant/Constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private http = inject(HttpClient);

  baseUrl =
    environment.ENVI_POINT == 'DEV' ? environment.DEV : environment.LOCAL;

  constructor() {}

  getUsers(): Observable<UserAccountList[]> {
    return this.http.get<UserAccountList[]>(
      this.baseUrl + Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT
    );
  }

  getUser(id: number): Observable<UserAccountGetAndUpdate> {
    return this.http.get<UserAccountGetAndUpdate>(
      this.baseUrl +
        `${Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT}/${id}`
    );
  }

  addUser(user: UserAccountCreate): Observable<UserAccountCreate> {
    return this.http.post<UserAccountCreate>(
      this.baseUrl + Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT,
      user
    );
  }

  updateUser(
    id: number,
    user: UserAccountGetAndUpdate
  ): Observable<UserAccountGetAndUpdate> {
    return this.http.put<UserAccountGetAndUpdate>(
      `${this.baseUrl}${Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT}/${id}`,
      user
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `UserAccount/${id}`);
  }
}
