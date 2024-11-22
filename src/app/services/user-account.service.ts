<<<<<<< HEAD
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { UserAccountModel } from "../Models/interface/user-account.model";

@Injectable({
  providedIn: "root",
})
export class UserAccountService {
  private http = inject(HttpClient);
  baseUrl = environment.API_LOCAL_EMPLOYEE_URL;

  constructor() {}

  getUsers() {
    return this.http.get<UserAccountModel[]>(this.baseUrl + "UserAccount");
  }

  getUser(id: number) {
    return this.http.get<UserAccountModel>(this.baseUrl + `UserAccount/${id}`);
  }

  addUser(user: UserAccountModel) {
    return this.http.post<UserAccountModel>(this.baseUrl + "UserAccount", user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + `UserAccount/${id}`);
  }

=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserAccount } from '../Models/interface/phoneEntryForm.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constant/Constants';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  constructor(private http: HttpClient) {}

  getAllUserAccounts(): Observable<IUserAccount> {
    return this.http.get<IUserAccount>(
      environment.API_LOCAL_CNCS_URL +
        Constant.API_USER_ACCOUNT_METHOD.GET_ALL_USER_ACCOUNT
    );
  }
>>>>>>> main
}
