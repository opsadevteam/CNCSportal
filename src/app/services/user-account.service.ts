import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import {
  DisplayUserAccount,
  EntryUserAccount,
} from "../Models/interface/userAccount.model";
import { Constant } from "../constant/Constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserAccountService {
  private http = inject(HttpClient);
  baseUrl = environment.API_LOCAL_CNCS_URL;

  constructor() {}

  getUsers(): Observable<DisplayUserAccount[]> {
    return this.http.get<DisplayUserAccount[]>(
      this.baseUrl + Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT
    );
  }

  getUser(id: number): Observable<EntryUserAccount> {
    return this.http.get<EntryUserAccount>(
      this.baseUrl +
        `${Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT}/${id}`
    );
  }

  addUser(user: EntryUserAccount): Observable<EntryUserAccount> {
    return this.http.post<EntryUserAccount>(
      this.baseUrl + Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT,
      user
    );
  }

  updateUser(id: number, user: EntryUserAccount): Observable<EntryUserAccount> {
    return this.http.put<EntryUserAccount>(
      `${this.baseUrl}${Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT}/${id}`,
      user
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `UserAccount/${id}`);
  }
}
