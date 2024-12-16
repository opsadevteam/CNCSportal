import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IProductVendor } from "../Models/interface/phoneEntryForm.model";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Constant } from "../constant/Constants";
import {
  Product,
  ProductCreate,
  ProductWithDescription,
  ProductUpdate,
  ProductWithLogs,
} from "../Models/interface/product-vendor.model";

@Injectable({
  providedIn: "root",
})
export class ProductVendorService {
  private http = inject(HttpClient);
  private products = Constant.API_PRODUCT_VENDOR_METHOD.GET_ALL_PRODUCT;
  private descriptions = Constant.API_DESCRIPTION_METHOD.GET_ALL_DESCRIPTIONS;
  private logs = Constant.API_PRODUCT_VENDOR_METHOD.GET_LOGS;
  constructor() {}

  baseUrl =
    environment.ENVI_POINT == "DEV" ? environment.DEV : environment.LOCAL;

  //old
  getAllProductVendors(): Observable<IProductVendor> {
    return this.http.get<IProductVendor>(
      this.baseUrl + Constant.API_PRODUCT_VENDOR_METHOD.GET_ALL_PRODUCT_VENDORS
    );
  }

  //new
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}${this.products}`);
  }

  getProductDescriptions(): Observable<ProductWithDescription[]> {
    return this.http.get<ProductWithDescription[]>(
      `${this.baseUrl}${this.products}/${this.descriptions}`
    );
  }

  getProductWithLogs(productId: number): Observable<ProductWithLogs> {
    return this.http.get<ProductWithLogs>(
      `${this.baseUrl}${this.products}/${productId}/${this.logs}`
    );
  }

  addProduct(product: ProductCreate): Observable<ProductCreate> {
    return this.http.post<ProductCreate>(
      `${this.baseUrl}${this.products}`,
      product
    );
  }

  updateProduct(
    productId: number,
    product: ProductUpdate
  ): Observable<ProductUpdate> {
    return this.http.put<ProductUpdate>(
      `${this.baseUrl}${this.products}/${productId}`,
      product
    );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.products}/${productId}`);
  }
}
