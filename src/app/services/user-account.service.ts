import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import {
  UserAccountGet,
  UserAccountUpsert,
} from "../Models/interface/userAccount.model";
import { Constant } from "../constant/Constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserAccountService {
  private http = inject(HttpClient);

  baseUrl =
    environment.ENVI_POINT == "DEV" ? environment.DEV : environment.LOCAL;

  constructor() {}

  getUsers(): Observable<UserAccountGet[]> {
    return this.http.get<UserAccountGet[]>(
      this.baseUrl + Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT
    );
  }

  getUser(id: number): Observable<UserAccountGet> {
    return this.http.get<UserAccountGet>(
      this.baseUrl +
        `${Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT}/${id}`
    );
  }

  addUser(user: UserAccountUpsert): Observable<UserAccountUpsert> {
    return this.http.post<UserAccountUpsert>(
      this.baseUrl + Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT,
      user
    );
  }

  updateUser(
    id: number,
    user: UserAccountUpsert
  ): Observable<UserAccountUpsert> {
    return this.http.put<UserAccountUpsert>(
      `${this.baseUrl}${Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT}/${id}`,
      user
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `UserAccount/${id}`);
  }
}
