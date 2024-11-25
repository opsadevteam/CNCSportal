import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductVendor } from '../Models/interface/phoneEntryForm.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constant/Constants';

@Injectable({
  providedIn: 'root',
})
export class DescriptionService {
  constructor(private http: HttpClient) {}

  baseUrl =
    environment.ENVI_POINT == 'DEV' ? environment.DEV : environment.LOCAL;

  getAllDescriptions(): Observable<IProductVendor> {
    return this.http.get<IProductVendor>(
      this.baseUrl + Constant.API_DESCRIPTION_METHOD.GET_ALL_DESCRIPTIONS
    );
  }
}
