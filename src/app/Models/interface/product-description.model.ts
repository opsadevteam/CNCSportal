export interface Description {
  id: number;
  description: string;
  productVendorId: number;
}

export interface DescriptionCreate {
  description: string;
  addedBy: string;
  dateAdded: Date;
  isDeleted: boolean;
  productVendorId: number;
}
