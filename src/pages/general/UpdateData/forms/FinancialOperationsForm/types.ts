interface IFinancialOperationsEntry {
  descriptionOperations: string;
  country: string;
  countryName: string;
  bankEntityCode: string;
  bankEntityName: string;
  accountType: string;
  currency: string;
  accountNumber: string | "";
  currentData?: IFinancialOperationsEntry;
}

enum EModalActiveStateFinancialOperations {
  IDLE = "idle",
  CREATE_DESCRIPTION = "CREATE_DESCRIPTION",
  EDIT_DESCRIPTION = "EDIT_DESCRIPTION",
  DELETE_DESCRIPTION = "DELETE_DESCRIPTION",
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  EDIT_ACCOUNT = "EDIT_ACCOUNT",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
}

export { EModalActiveStateFinancialOperations };
export type { IFinancialOperationsEntry };
