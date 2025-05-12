import { IEntryCategory } from "../ChooseEntriesForm/types";

interface ILiquidationEntry {
  entriesCategories: IEntryCategory[];
  totalValue: number;
}

export type { ILiquidationEntry };
