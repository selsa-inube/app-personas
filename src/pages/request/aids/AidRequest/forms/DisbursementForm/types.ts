import { ISelectOption } from "@design/input/Select/types";

interface IDisbursementEntry {
  accountOptions: ISelectOption[];
  disbursementMethod: string;
  account: string;
  accountDescription: string;
}

export type { IDisbursementEntry };
