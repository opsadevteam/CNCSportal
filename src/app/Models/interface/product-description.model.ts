export interface Description {
  id: number;
  description: string;
}

export interface DescriptionCreate {
  description: string;
  addedBy: string;
  dateAdded: Date;
  isDeleted: boolean;
  productVendorId: number;
}
