import { IEntryCategory } from "@pages/request/events/RegisterInEvent/forms/ChooseEntriesForm/types";

interface IGetEntriesCostRequest {
  customerCode: string;
  typeDocument: string;
  documentNumber: string;
  branch: string;
}

interface IGetEntriesCostResponse {
  entriesCategories: IEntryCategory[];
}

export type { IGetEntriesCostRequest, IGetEntriesCostResponse };
