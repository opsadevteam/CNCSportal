import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductVendor } from '../Models/interface/phoneEntryForm.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Constant } from '../constant/Constants';

@Injectable({
  providedIn: 'root',
})
export class ProductVendorService {
  constructor(private http: HttpClient) {}

  getAllProductVendors(): Observable<IProductVendor> {
    return this.http.get<IProductVendor>(
      environment.API_LOCAL_CNCS_URL +
        Constant.API_PRODUCT_VENDOR_METHOD.GET_ALL_PRODUCT_VENDORS
    );
  }
}
