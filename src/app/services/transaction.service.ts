import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPhoneEntryFormTransaction } from '../Models/interface/phoneEntryForm.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constant/Constants';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  addTransaction(
    obj: IPhoneEntryFormTransaction
  ): Observable<IPhoneEntryFormTransaction> {
    return this.http.post<IPhoneEntryFormTransaction>(
      environment.API_LOCAL_EMPLOYEE_URL +
        Constant.API_METHOD.CREATE_TRANSACTION,
      obj
    );
  }
}
