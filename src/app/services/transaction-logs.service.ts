import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPhoneEntryFormTransaction } from '../Models/interface/phoneEntryForm.model';
import { map, Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constant/Constants';
import { IPhoneRecord } from '../Models/interface/phone-record.model';
import { ITransactionLog } from '../Models/interface/transaction-log.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionLogsService {
  constructor(private http: HttpClient) {}

  baseUrl =
    environment.ENVI_POINT == 'DEV' ? environment.DEV : environment.LOCAL;

  getTransactionLogsByTransactionId(
    transactionId: string
  ): Observable<ITransactionLog[]> {
    const url = `${this.baseUrl}${Constant.API_TRANSACTION_LOGS_METHOD.GET_TRANSACTION_LOGS_RECORDS}/${transactionId}`;
    return this.http.get<ITransactionLog[]>(url).pipe(
      map((logs) => logs),
      catchError((error) => {
        console.error('Error fetching transaction logs:', error);
        throw error;
      })
    );
  }
}
