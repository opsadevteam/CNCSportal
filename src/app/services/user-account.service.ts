import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  DisplayUserAccount,
  EntryUserAccount,
} from '../Models/interface/user-account.model';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private http = inject(HttpClient);
  baseUrl = environment.API_LOCAL_CNCS_URL;

  constructor() {}

  getUsers() {
    return this.http.get<DisplayUserAccount[]>(this.baseUrl + 'UserAccount');
  }

  getUser(id: number) {
    return this.http.get<EntryUserAccount>(this.baseUrl + `UserAccount/${id}`);
  }

  addUser(user: EntryUserAccount) {
    return this.http.post<EntryUserAccount>(this.baseUrl + 'UserAccount', user);
  }

  updateUser(id: number, user: EntryUserAccount) {
    return this.http.put<EntryUserAccount>(
      `${this.baseUrl}UserAccount/${id}`,
      user
    );
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + `UserAccount/${id}`);
  }
}
