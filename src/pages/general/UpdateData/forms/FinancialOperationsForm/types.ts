interface IFinancialOperationsEntry {
  hasForeignCurrencyTransactions: string;
  hasForeignCurrencyAccounts: string;
  descriptionOperations: string;
  country: string;
  bankEntity: string;
  currency: string;
  accountNumber: number;
  currentData?: IFinancialOperationsEntry;
}

export type { IFinancialOperationsEntry };
