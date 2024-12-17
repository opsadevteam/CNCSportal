import { Description } from "./product-description.model";
import { ProductLog } from "./product-log.model";

export interface Product {
  id: number;
  name: string;
}

export interface ProductWithDescription {
  id: number;
  name: string;
  descriptions: Description[];
}

export interface ProductWithLogs {
  id: number;
  name: string;
  productLogs: ProductLog[];
}

export interface ProductUpdate {
  name: string;
}

export interface ProductCreate {
  id?: number;
  name: string;
  addedBy: string;
  dateAdded: Date;
  isDeleted: boolean;
}
