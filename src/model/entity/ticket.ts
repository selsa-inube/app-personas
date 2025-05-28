import { DateType, TimestampType } from "@ptypes/date.types";
import { EntryType } from "./event";

interface ITicket {
  id: string;
  title: string;
  type: string;
  date: TimestampType;
  ticketsAvailable: number;
  product: string;
  productName: string;
  eventType: string;
  eventTypeName: string;
  documentType: string;
  documentNumber: string;
  branch: string;
  deadlineDate: DateType;
  description: string;
  country: string;
  countryName: string;
  department: string;
  departmentName: string;
  city: string;
  cityName: string;
  address: string;
  initHour: string;
  endHour: string;
  entriesUser: number;
  entryType: EntryType;
}

interface IGroupTicket {
  category: string;
  categoryName: string;
  tickets: ITicket[];
}

export type { IGroupTicket, ITicket };
