import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { UserAccountModel } from "../Models/interface/user-account.model";

@Injectable({
  providedIn: "root",
})
export class UserAccountService {
  private http = inject(HttpClient);
  baseUrl = environment.API_LOCAL_CNCS_URL;

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
}
