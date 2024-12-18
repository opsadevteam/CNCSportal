import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Constant } from '../constant/Constants';
import {
  IAccountLoginRequest,
  IAccountLoginResponse,
} from '../Models/interface/account-login.model';

@Injectable({
  providedIn: 'root',
})
export class AccountLoginService {
  constructor(private http: HttpClient) {}

  baseUrl =
    environment.ENVI_POINT == 'DEV' ? environment.DEV : environment.LOCAL;

  logInAccountRequest(
    obj: IAccountLoginRequest
  ): Observable<IAccountLoginResponse> {
    return this.http.post<IAccountLoginResponse>(
      this.baseUrl + Constant.API_ACCOUNT_METHOD.ACCOUNT_LOGIN,
      obj
    );
  }
}
