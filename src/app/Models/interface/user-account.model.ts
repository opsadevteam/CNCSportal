export interface UserAccountModel {
  id: number;
  fullName: string;
  username: string;
  password: string;
  userGroup: string;
  status: string;
  addedBy: string;
  dateAdded: string;
  isDeleted: boolean;
  logId: string;
}
