export interface Product {
  id: number;
  name: string;
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
