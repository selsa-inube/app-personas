import { ISelectOption } from "@design/input/Select/types";

interface IDisbursementEntry {
  accountOptions?: ISelectOption[];
  disbursementMethod: string;
  account?: string;
  accountDescription?: string;
  disbursedAccount?: string;
  bankEntity?: string;
  accountType?: string;
  accountNumberTextField?: string;
}

export type { IDisbursementEntry };
