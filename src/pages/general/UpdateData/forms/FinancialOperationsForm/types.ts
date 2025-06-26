interface IFinancialOperationsEntry {
  hasForeignCurrencyTransactions: string;
  hasForeignCurrencyAccounts: string;
  descriptionOperations: string;
  country: string;
  bankEntity: string;
  currency: string;
  accountNumber: number | string;
  currentData?: IFinancialOperationsEntry;
}

export type { IFinancialOperationsEntry };
