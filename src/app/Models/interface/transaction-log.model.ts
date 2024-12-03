export interface ITransactionLog {
  id: string;
  logType: string;
  status: string;
  transactionId: string;
  customerId: string;
  repliedBy: string;
  pickUpDate: string | Date;
  takeOffDate: string | Date;
  productVendorId?: string;
  descriptionId?: string;
  dateAdded: string | Date;
}
