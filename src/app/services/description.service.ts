import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IProductVendor } from "../Models/interface/phoneEntryForm.model";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Constant } from "../constant/Constants";
import {
  Description,
  DescriptionCreate,
} from "../Models/interface/product-description.model";

@Injectable({
  providedIn: "root",
})
export class DescriptionService {
  private http = inject(HttpClient);
  private products = Constant.API_PRODUCT_VENDOR_METHOD.GET_ALL_PRODUCT;
  private descriptions = Constant.API_DESCRIPTION_METHOD.GET_ALL_DESCRIPTIONS;

  baseUrl =
    environment.ENVI_POINT == "DEV" ? environment.DEV : environment.LOCAL;

  getAllDescriptions(): Observable<IProductVendor> {
    return this.http.get<IProductVendor>(
      this.baseUrl + Constant.API_DESCRIPTION_METHOD.GET_ALL_DESCRIPTIONS
    );
  }

  getDescriptionsById(productId: number): Observable<Description[]> {
    return this.http.get<Description[]>(
      `${this.baseUrl}${this.products}/${productId}/${this.descriptions}`
    );
  }

  getDescription(descriptionId: number): Observable<Description> {
    return this.http.get<Description>(
      `${this.baseUrl}${this.products}/${descriptionId}`
    );
  }

  addDescription(
    description: DescriptionCreate
  ): Observable<DescriptionCreate> {
    return this.http.post<DescriptionCreate>(
      `${this.baseUrl}${this.descriptions}`,
      description
    );
  }

  updateDescription(
    descriptionId: number,
    description: Description,
    productId: number
  ): Observable<Description> {
    const params = new HttpParams().set("Product_Id", productId.toString());

    return this.http.put<Description>(
      `${this.baseUrl}${this.descriptions}/${descriptionId}`,
      description,
      { params }
    );
  }
}
