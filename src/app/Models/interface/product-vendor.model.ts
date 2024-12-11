import { Description } from "./product-description.model";

export interface Product {
  id: number;
  name: string;
}

export interface ProductWithDescriptions {
  id: number;
  name: string;
  descriptions: Description[];
}
