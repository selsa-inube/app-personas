import { IEvent } from "src/model/entity/event";

interface IEntryCategory {
  id: string;
  name: string;
  value: number;
  subsidyValue: number;
  subsidyName: string;
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
}

export type { IChooseEntriesEntry, IEntryCategory };
