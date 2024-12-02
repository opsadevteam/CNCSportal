export interface IPhoneRecord {
  id: string;
  status: string;
  transactionId: string;
  customerId: string;
  repliedBy: string;
  pickUpDate: string | Date;
  takeOffDate: string | Date;
  dateAdded: string | Date;
  productVendorId?: string;
  descriptionId?: string;
  transactionType: string;
  isDeleted: boolean;
  remark: string;
}
