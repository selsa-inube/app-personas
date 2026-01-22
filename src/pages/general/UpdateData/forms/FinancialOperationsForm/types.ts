interface IFinancialOperationsEntry {
  descriptionOperations: string;
  country: string;
  countryName: string;
  bankEntityCode: string;
  bankEntityName: string;
  accountType: string;
  currency: string;
  currencyName: string;
  accountNumber: string;
  currentData?: IFinancialOperationsEntry;
}

enum EModalActiveStateFinancialOperations {
  IDLE = "idle",
  CREATE_OPERATION = "CREATE_OPERATION",
  EDIT_OPERATION = "EDIT_OPERATION",
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  EDIT_ACCOUNT = "EDIT_ACCOUNT",
}

export { EModalActiveStateFinancialOperations };
export type { IFinancialOperationsEntry };
