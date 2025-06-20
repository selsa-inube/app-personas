import { DateType, TimestampType } from "@ptypes/date.types";

type EntryType = "OpenEntries" | "ConditionalEntries";
type EventType = "Event" | "Ticket";

interface IEvent {
  id: string;
  title: string;
  type: EventType;
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

interface IGroupEvent {
  category: string;
  categoryName: string;
  events: IEvent[];
}

export type { EntryType, EventType, IEvent, IGroupEvent };
