export interface UserAccountGet {
  id: number;
  fullName: string;
  username: string;
  password: string;
  userGroup: string;
  status: string;
  dateAdded: Date;
  addedBy: string;
}

export interface UserAccountUpsert {
  id: number;
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
