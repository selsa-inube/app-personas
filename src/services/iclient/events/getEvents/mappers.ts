import { IEvent } from "src/model/entity/event";
import { capitalizeText } from "src/utils/texts";

const mapEventApiToEntity = (
  event: Record<string, string | number | object>,
): IEvent => {
  return {
    id: String(event.id),
    title: capitalizeText(String(event.title)),
    type: String(event.type),
    date: new Date(String(event.date)),
    ticketsAvailable: Number(event.ticketsAvailable),
    product: String(event.product),
    productName: String(event.productName),
    eventType: String(event.eventType),
    eventTypeName: String(event.eventTypeName),
    deadlineDate: String(event.deadlineDate),
    description: String(event.description),
    country: String(event.country),
    countryName: String(event.countryName),
    department: String(event.department),
    departmentName: String(event.departmentName),
    city: String(event.city),
    cityName: String(event.cityName),
    address: String(event.address),
    initHour: String(event.initHour),
    endHour: String(event.endHour),
    entriesUser: Number(event.entriesUser),
  };
};

const mapEventsApiToEntities = (
  events: Record<string, string | number | object>[],
): IEvent[] => {
  return events.map((event) => mapEventApiToEntity(event));
};

export { mapEventApiToEntity, mapEventsApiToEntities };
