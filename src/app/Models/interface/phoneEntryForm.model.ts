export interface IPhoneEntryFormTransaction {
  transactionId: string;
  customerId: string;
  pickUpDate: string;
  takeOffDate: string;
  duration: number;
  productVendorId: number;
  descriptionId: number;
  remark: string;
  repliedBy: string;
  status: string;
  addedBy: string;
  dateAdded: string;
  shift: string;
  transactionType: string;
  logId: string;
  isDeleted: false;
}

export interface IEmailEntryFormTransaction {
  transactionId: string;
  customerId: string;
  pickUpDate: string;
  takeOffDate: string;
  duration: number;
  productVendorId: number;
  descriptionId: number;
  remark: string;
  repliedBy: string;
  status: string;
  addedBy: string;
  dateAdded: string;
  shift: string;
  transactionType: string;
  logId: string;
  isDeleted: false;
}

export interface IProductVendor {
  id: number;
  productVendor: string;
  addedBy: string;
  dateAdded: string;
  isDeleted: false;
  logId: string;
}

export interface IDescription {
  id: number;
  productVendorId: string;
  description: string;
  addedBy: string;
  dateAdded: string;
  isDeleted: false;
  logId: string;
}

export interface IUserAccount {
  id: number;
  fullName: string;
  username: string;
  password: string;
  userGroup: string;
  status: false;
  addedBy: string;
  dateAdded: string;
  isDeleted: false;
  logId: string;
}
