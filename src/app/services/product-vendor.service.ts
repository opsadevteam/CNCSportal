import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IProductVendor } from "../Models/interface/phoneEntryForm.model";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Constant } from "../constant/Constants";
import { ProdAndDescListModel } from "../Models/interface/product-vendor.model";

@Injectable({
  providedIn: "root",
})
export class ProductVendorService {
  private http = inject(HttpClient);
  private prodAndDescList =
    Constant.API_PRODUCT_VENDOR_METHOD.GET_ALL_PRODUCT_VENDORS_NEW;

  constructor() {}

  baseUrl =
    environment.ENVI_POINT == "DEV" ? environment.DEV : environment.LOCAL;

  getAllProductVendors(): Observable<IProductVendor> {
    return this.http.get<IProductVendor>(
      this.baseUrl + Constant.API_PRODUCT_VENDOR_METHOD.GET_ALL_PRODUCT_VENDORS
    );
  }

  getProdAndDescList(): Observable<ProdAndDescListModel[]> {
    return this.http.get<ProdAndDescListModel[]>(
      `${this.baseUrl}${this.prodAndDescList}`
    );
  }
}
