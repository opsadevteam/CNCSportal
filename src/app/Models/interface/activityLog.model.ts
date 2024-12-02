export interface ActivitylogGet {
  id: number;
  logActivity: string;
  logUser: string;
  logTime: Date;
  logDetails: string;
  userGroup: string;
}

export interface ActivitylogInsert {
  id: number;
  logActivity: string;
  logUser: string;
  logTime: Date;
  logDetails: string;
  logLocation: string;
  userGroup: string;
}
