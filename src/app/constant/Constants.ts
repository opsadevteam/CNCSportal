//sample
export const Constant = {
  API_ACCOUNT_METHOD: {
    ACCOUNT_LOGIN: 'Account/Login',
  },
  API_TRANSACTIONS_METHOD: {
    CREATE_TRANSACTION: "Transaction",
    GET_ALL_TRANSACTION: "Transaction",
    GET_TRANSACTIONS_BY_CUSTOMER_ID: "Transaction/CustomerId/",
  },
  API_PRODUCT_VENDOR_METHOD: {
    GET_ALL_PRODUCT_VENDORS: "ProductVendor",
    GET_ALL_PRODUCT: "Products",
    GET_LOGS: "Logs",
  },
  API_PRODUCT_LOGS_METHOD: {
    GET_PRODUCT_LOGS: "ProductLogs",
  },
  API_PRODUCT_DESCRIPTION_METHOD: {
    GET_ALL_PRODUCT_DESCRIPTIONS: "ProductDescription",
  },
  API_DESCRIPTION_METHOD: {
    GET_ALL_DESCRIPTIONS: "Descriptions",
    GET_LOGS: "Logs",
  },
  API_DESCRIPTION_LOGS_METHOD: {
    GET_DESCRIPTION_LOGS: "DescriptionLogs",
  },
  API_USER_ACCOUNTS_METHOD: {
    GET_ALL_USER_ACCOUNTS: "UserAccounts",
    UPDATE_USER_ACCOUNT_PASSWORD: "Password",
  },
  API_ACTIVITY_LOG_METHOD: {
    GET_ALL_LOG_ACCOUNT: "ActivityLogs",
  },
  API_EMAIL_RECORDS_METHOD: {
    GET_ALL_EMAIL_RECORDS: "EmailRecords",
  },
  API_TRANSACTION_LOGS_METHOD: {
    GET_TRANSACTION_LOGS_RECORDS: "TransactionLogs/id", //get transactionID instead of ID only (only exception)
  },
  API_WORKLOAD_STATISTICS_METHOD: {
    GET_SUMMARY_RECORDS: "WorkloadStatistics",
  },
  CNCS_VERSION: {
    NUMBER: '1.0.4',
  },

  MESSAGES: {
    PHONE_ENTRY_FORM:
      'This page is the phone entry form where all inbound and outbound calls are loged. It helps track and document every phone interaction for efficient  record-keeping.',

    EMAIL_ENTRY_FORM:
      ' This page is the email entry form where all incoming and outgoing emails are recorded. It helps track and document email communication for organized and efficient record-keeping',
  },

  USER_STATUS: {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    CLOSED: 'Closed',
  },

  USER_GROUP: {
    ADMIN: 'Admin',
    LEADER: 'Leader',
    OFFICER: 'Officer',
  },
};
