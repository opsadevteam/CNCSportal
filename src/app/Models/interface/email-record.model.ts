export interface IEmailRecord {
  id: string;
  status: string;
  transactionId: string;
  customerId: string;
  repliedBy: string;
  pickUpDate: string | Date;
  takeOffDate: string | Date;
  dateAdded: string | Date;
  vendorList?: any;
  descriptionList?: any;
}
