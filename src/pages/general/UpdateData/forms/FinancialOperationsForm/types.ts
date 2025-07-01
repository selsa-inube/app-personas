interface IFinancialOperationsEntry {
  hasForeignCurrencyTransactions: string;
  hasForeignCurrencyAccounts: string;
  descriptionOperations: string;
  country: string;
  bankEntity: string;
  currency: string;
  accountNumber: string;
  currentData?: IFinancialOperationsEntry;
}

export type { IFinancialOperationsEntry };
