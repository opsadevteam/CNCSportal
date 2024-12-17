import { DescriptionLog } from "./description-log.model";

export interface Description {
  id: number;
  description: string;
}

export interface DescriptionCreate {
  id?: number;
  description: string;
  addedBy: string;
  dateAdded: Date;
  isDeleted: boolean;
  productVendorId: number;
}

export interface DescriptionWithLogs {
  id: number;
  description: string;
  descriptionLogs: DescriptionLog[];
}
