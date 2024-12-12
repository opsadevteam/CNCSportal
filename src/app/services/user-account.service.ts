import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import {
  UserAccountChangePassword,
  UserAccountCreate,
  UserAccountGetAndUpdate,
  UserAccountList,
} from "../Models/interface/userAccount.model";
import { Constant } from "../constant/Constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserAccountService {
  private http = inject(HttpClient);
  private userAccounts =
    Constant.API_USER_ACCOUNTS_METHOD.GET_ALL_USER_ACCOUNTS;
  private password =
    Constant.API_USER_ACCOUNTS_METHOD.UPDATE_USER_ACCOUNT_PASSWORD;

  baseUrl =
    environment.ENVI_POINT == "DEV" ? environment.DEV : environment.LOCAL;

  constructor() {}

  getUsers(): Observable<UserAccountList[]> {
    return this.http.get<UserAccountList[]>(
      `${this.baseUrl}${this.userAccounts}`
    );
  }

  getUser(userAccountId: number): Observable<UserAccountGetAndUpdate> {
    return this.http.get<UserAccountGetAndUpdate>(
      `${this.baseUrl}${this.userAccounts}/${userAccountId}`
    );
  }

  addUser(user: UserAccountCreate): Observable<UserAccountCreate> {
    return this.http.post<UserAccountCreate>(
      `${this.baseUrl}${this.userAccounts}`,
      user
    );
  }

  updateUserDetails(
    userAccountId: number,
    user: UserAccountGetAndUpdate
  ): Observable<UserAccountGetAndUpdate> {
    return this.http.put<UserAccountGetAndUpdate>(
      `${this.baseUrl}${this.userAccounts}/${userAccountId}`,
      user
    );
  }

  updateUserPassword(userAccountId: number,
    user: UserAccountChangePassword): Observable<UserAccountChangePassword>{
      return this.http.put<UserAccountChangePassword>(
        `${this.baseUrl}${this.userAccounts}/${userAccountId}/${this.password}`,
        user
      )
  };

  deleteUser(userAccountId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}${this.userAccounts}/${userAccountId}`
    );
  }
}
