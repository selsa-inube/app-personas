import { IEvent } from "src/model/entity/event";
import { IBeneficiary } from "src/model/entity/user";

interface IEntryCategory {
  id: string;
  name: string;
  value: number;
  subsidyValue?: number;
  subsidyName?: string;
  count?: number;
  fullValue?: number;
  subTotal?: number;
}

interface IChooseEntriesEntry {
  event?: IEvent;
  entriesCategories: IEntryCategory[];
  isExceeded?: boolean;
  totalEntries: number;
  totalValue: number;
  participants?: IBeneficiary[];
}

export type { IChooseEntriesEntry, IEntryCategory };
