import { ProductDescriptionModel } from "./product-description.model";

export interface ProdAndDescListModel {
  id: number;
  name: string;
  descriptions: ProductDescriptionModel[];
}
