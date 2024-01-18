import { ISelectOption } from "@design/input/Select/types";

interface IReimbursementEntry {
    reimbursementType: string;
    accountReimbursement: string;
  }

  interface IFormReimbursement {
    transferToExternalAccount: ISelectOption[] | [];
    creditToInternalAccount: ISelectOption[];
  }
  
  export type { IReimbursementEntry, IFormReimbursement };