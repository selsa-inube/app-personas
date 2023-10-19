interface IFinancialOperationsEntry {
  hasForeignCurrencyTransactions: string;
  hasForeignCurrencyAccounts: string;
  descriptionOperations: string;
  country: string;
  bankEntity: string;
  currency: string;
  accountNumber: number;
}

export type { IFinancialOperationsEntry };
