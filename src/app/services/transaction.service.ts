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
      environment.API_LOCAL_CNCS_URL + Constant.API_TRANSACTIONS_METHOD.CREATE_TRANSACTION,
      obj
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
