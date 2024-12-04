export interface UserAccountList {
  id: number;
  fullName: string;
  username: string;
  password: string;
  userGroup: string;
  status: string;
  dateAdded: Date;
}

export interface UserAccountGetAndUpdate {
  id: number;
  fullName: string;
  username: string;
  password: string;
  userGroup: string;
  status: string;
}

export interface UserAccountCreate {
  fullName: string;
  username: string;
  password: string;
  userGroup: string;
  status: string;
  addedBy: string;
  dateAdded: Date;
  isDeleted: boolean;
  logId: string;
}
