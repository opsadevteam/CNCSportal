export interface IEntryFormsMenuItem {
  icon: string;
  label: string;
  route?: string;
}

export interface IRecordsMenuItem {
  icon: string;
  label: string;
  route?: string;
}

export interface IReportsMenuItem {
  icon: string;
  label: string;
  route?: string;
}

export interface IAccountsMenuItem {
  icon: string;
  label: string;
  route?: string;
}
//2

export interface icon {
  icon: string;
  label: string;
  route?: string;
}

export interface IRecordsMenuItem {
  icon: string;
  label: string;
  route?: string;
}

export interface IReportsMenuItem {
  icon: string;
  label: string;
  route?: string;
}

export interface IAccountsMenuItem {
  icon: string;
  label: string;
  route?: string;
}

//Sample Data
//Menu items
export const EntryFormsMenuItemData = [
  {
    icon: 'phone',
    label: 'Phone',
    route: 'phoneform',
  },
  {
    icon: 'email',
    label: 'Email',
    route: 'emailform',
  },
];

export const RecordsMenuItemDataAdmin = [
  {
    icon: 'view_list',
    label: 'Phone Records',
    route: 'phonerecords',
  },
  {
    icon: 'view_list',
    label: 'Email Records',
    route: 'emailrecords',
  },
  {
    icon: 'face',
    label: 'User Management',
    route: 'usermanagement',
  },
  {
    icon: 'tune',
    label: 'Activity Logs',
    route: 'activitylogs',
  },
];

export const RecordsMenuItemData = [
  {
    icon: 'view_list',
    label: 'Phone Records',
    route: 'phonerecords',
  },
  {
    icon: 'view_list',
    label: 'Email Records',
    route: 'emailrecords',
  },
];

export const ReportsMenuItemData = [
  {
    icon: 'poll',
    label: 'Workload Statistics',
    route: 'workloadstatistics',
  },
];

export const AccountsMenuItemDataAdmin = [
  {
    icon: 'settings',
    label: 'Settings',
    route: 'settings',
  },
  {
    icon: 'shopping_cart',
    label: 'Product & Vendor',
    route: 'productandvendor',
  },
  {
    icon: 'security',
    label: 'Change Password',
    route: 'changepassword',
  },
];

export const AccountsMenuItemData = [
  {
    icon: 'settings',
    label: 'Settings',
    route: 'settings',
  },
  {
    icon: 'security',
    label: 'Change Password',
    route: 'changepassword',
  },
];
