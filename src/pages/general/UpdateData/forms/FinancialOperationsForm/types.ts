interface IFinancialOperationsEntry {
  hasForeignCurrencyTransactions: string;
  hasForeignCurrencyAccounts: string;
  descriptionOperationsForeignCurrency: string;
  country: string;
  bankingEntity: string;
  currency: string;
  accountNumber: number;
}

export type { IFinancialOperationsEntry };
