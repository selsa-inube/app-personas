import { ITicket } from "src/model/entity/ticket";
import { capitalizeText } from "src/utils/texts";

const mapTicketApiToEntity = (
  ticket: Record<string, string | number | object>,
): ITicket => {
  return {
    id: String(ticket.id || ""),
    title: capitalizeText(String(ticket.title || "")),
    type: String(ticket.type || ""),
    date: new Date(String(ticket.date || "")),
    ticketsAvailable: Number(ticket.ticketsAvailable || 0),
    product: String(ticket.product || ""),
    productName: String(ticket.productName || ""),
    eventType: String(ticket.ticketType || ""),
    eventTypeName: String(ticket.ticketTypeName || ""),
    deadlineDate: String(ticket.deadlineDate || ""),
    description: String(ticket.description || ""),
    country: String(ticket.country || ""),
    countryName: capitalizeText(String(ticket.countryName || "")),
    department: String(ticket.department || ""),
    departmentName: capitalizeText(String(ticket.departmentName || "")),
    city: String(ticket.city || ""),
    cityName: capitalizeText(String(ticket.cityName || "")),
    address: String(ticket.address || ""),
    initHour: String(ticket.initHour || ""),
    endHour: String(ticket.endHour || ""),
    entriesUser: Number(ticket.entriesUser || 0),
  };
};

const mapTicketsApiToEntities = (
  tickets: Record<string, string | number | object>[],
): ITicket[] => {
  return tickets.map((ticket) => mapTicketApiToEntity(ticket));
};

export { mapTicketApiToEntity, mapTicketsApiToEntities };
