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
}
