import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Constant } from "../constant/Constants";
import { ProductLog } from "../Models/interface/product-log.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductLogService {
  private http = inject(HttpClient);
  private productlogs = Constant.API_PRODUCT_LOGS_METHOD.GET_PRODUCT_LOGS;

  baseUrl =
    environment.ENVI_POINT == "DEV" ? environment.DEV : environment.LOCAL;

  constructor() {}

  addProductLogs(productLog: ProductLog): Observable<ProductLog> {
    return this.http.post<ProductLog>(
      `${this.baseUrl}${this.productlogs}`,
      productLog
    );
  }
}
