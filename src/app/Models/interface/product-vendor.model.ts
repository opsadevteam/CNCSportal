import { Description } from './product-description.model';

export interface Product {
  id: number;
  name: string;
}

export interface ProductDescription {
  id: number;
  name: string;
  descriptions: Description[];
}

export interface ProductUpdate {
  name: string;
}

export interface ProductCreate {
  name: string;
  addedBy: string;
  dateAdded: Date;
  isDeleted: boolean;
}
