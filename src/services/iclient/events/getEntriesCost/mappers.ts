import { IEntryCategory } from "@pages/request/events/RegisterInEvent/forms/ChooseEntriesForm/types";
import { IGetEntriesCostRequest } from "./types";

const mapEntryEntityToApi = (
  registrationRequest: IGetEntriesCostRequest,
): Record<string, string | number | object> => {
  return {
    customerCode: registrationRequest.customerCode,
    typeDocument: registrationRequest.typeDocument,
    documentNumber: registrationRequest.documentNumber,
    branch: registrationRequest.branch,
  };
};

const mapEntryApiToEntity = (
  entry: Record<string, string | number | object>,
): IEntryCategory => {
  return {
    id: String(entry.id || ""),
    name: String(entry.name || ""),
    value: Number(entry.value || 0),
    subsidyValue: entry.subsidyValue ? Number(entry.subsidyValue) : undefined,
    subsidyName: entry.subsidyName ? String(entry.subsidyName) : undefined,
    allowedRelationships: Array.isArray(entry.allowedRelationships)
      ? entry.allowedRelationships
      : [],
  };
};

const mapEntriesApiToEntities = (
  entries: Record<string, string | number | object>[],
): IEntryCategory[] => {
  return entries.map((entry) => mapEntryApiToEntity(entry));
};

export { mapEntriesApiToEntities, mapEntryApiToEntity, mapEntryEntityToApi };
