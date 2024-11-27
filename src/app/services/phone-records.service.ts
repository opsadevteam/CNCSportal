import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPhoneEntryFormTransaction } from '../Models/interface/phoneEntryForm.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constant/Constants';
import { IPhoneRecord } from '../Models/interface/phone-record.model';

@Injectable({
  providedIn: 'root'
})
export class PhoneRecordsService {

  constructor(private http: HttpClient) {}

  baseUrl =
    environment.ENVI_POINT == 'DEV' ? environment.DEV : environment.LOCAL;

    fetchRecords(): Observable<IPhoneRecord[]> {
      return this.http
        .get<IPhoneRecord[]>(
          this.baseUrl + Constant.API_EMAIL_RECORDS_METHOD.GET_ALL_EMAIL_RECORDS
        )
        .pipe(
          map((records) =>
            records.map((record) => ({
              ...record,
              pickUpDate: new Date(record.pickUpDate),
              takeOffDate: new Date(record.takeOffDate),
              dateAdded: new Date(record.dateAdded),
            }))
          )
        );
    }
  
    deleteUser(id: number): Observable<any> {
      const deleteDto = {
        Id: id,
        IsDeleted: true,
      };
      return this.http.put(
        this.baseUrl +
          Constant.API_EMAIL_RECORDS_METHOD.DELETE_SINGLE_EMAIL_RECORDS +
          `/delete/${id}`,
        deleteDto
      );
    }
}
