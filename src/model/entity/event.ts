import { DateType, TimestampType } from "@ptypes/date.types";

interface IEvent {
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
}

interface IGroupEvent {
  category: string;
  categoryName: string;
  events: IEvent[];
}

export type { IEvent, IGroupEvent };
