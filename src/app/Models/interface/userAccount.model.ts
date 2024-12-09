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

export interface UserAccountChangePassword {
  newPassword: string;
}
