import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPhoneEntryFormTransaction, IPhoneEntryFormTransactionDetailed } from '../Models/interface/phoneEntryForm.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constant/Constants';
import { IEmailRecord } from '../Models/interface/email-record.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  baseUrl =
    environment.ENVI_POINT == 'DEV' ? environment.DEV : environment.LOCAL;

  addTransaction(
    obj: IPhoneEntryFormTransaction
  ): Observable<IPhoneEntryFormTransaction> {
    return this.http.post<IPhoneEntryFormTransaction>(
      this.baseUrl + Constant.API_TRANSACTIONS_METHOD.CREATE_TRANSACTION,
      obj
    );
  }

  getAllTransactions(): Observable<IPhoneEntryFormTransaction> {
    return this.http.get<IPhoneEntryFormTransaction>(
      this.baseUrl + Constant.API_TRANSACTIONS_METHOD.GET_ALL_TRANSACTION
    );
  }

  getTransactionsByCustomerId(
    customerId: string
  ): Observable<IPhoneEntryFormTransactionDetailed> {
    return this.http.get<IPhoneEntryFormTransactionDetailed>(
      this.baseUrl +
        Constant.API_TRANSACTIONS_METHOD.GET_TRANSACTIONS_BY_CUSTOMER_ID +
        customerId
    );
  }

  //
  //
  //
  //
  //sample calls from hris
  // getAllEmployees(): Observable<IEmployee> {
  //   return this.http.get<IEmployee>(
  //     environment.API_LOCAL_EMPLOYEE_URL + Constant.API_METHOD.GET_ALL_EMPLOYEES
  //   );
  // }

  // getEmployee(id: number): Observable<IEmployee> {
  //   return this.http.get<IEmployee>(
  //     environment.API_LOCAL_EMPLOYEE_URL + Constant.API_METHOD.GET_EMPLOYEE + id
  //   );
  // }

  // addEmployee(obj: IEmployee): Observable<IEmployee> {
  //   return this.http.post<IEmployee>(
  //     environment.API_LOCAL_EMPLOYEE_URL +
  //       Constant.API_METHOD.GET_ALL_EMPLOYEES,
  //     obj
  //   );
  // }

  // updateEmployee(id: number, obj: IEmployee): Observable<IEmployee> {
  //   return this.http.put<IEmployee>(
  //     environment.API_LOCAL_EMPLOYEE_URL +
  //       Constant.API_METHOD.GET_EMPLOYEE +
  //       id,
  //     obj
  //   );
  // }

  // deleteEmployeeById(id: number): Observable<IEmployee> {
  //   return this.http.delete<IEmployee>(
  //     environment.API_LOCAL_EMPLOYEE_URL + Constant.API_METHOD.GET_EMPLOYEE + id
  //   );
  // }
  //
  //
  //
  //
  //
}
