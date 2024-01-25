import { ISelectOption } from "@design/input/Select/types";

interface IReimbursementEntry {
  reimbursementType: string;
  accountReimbursement: string;
}

interface IReimbursementOptions {
  transferToExternalAccount?: ISelectOption[];
  creditToInternalAccount: ISelectOption[];
}

export type { IReimbursementEntry, IReimbursementOptions };
