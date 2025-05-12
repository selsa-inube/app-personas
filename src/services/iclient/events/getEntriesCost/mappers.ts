import { IEntryCategory } from "@pages/request/events/RegisterInEvent/forms/ChooseEntriesForm/types";

const mapEntryApiToEntity = (
  entry: Record<string, string | number | object>,
): IEntryCategory => {
  return {
    id: String(entry.id || ""),
    name: String(entry.name || ""),
    value: Number(entry.value || 0),
    subsidyValue: Number(entry.subsidyValue || 0),
    subsidyName: String(entry.subsidyName || ""),
  };
};

const mapEntriesApiToEntities = (
  entries: Record<string, string | number | object>[],
): IEntryCategory[] => {
  return entries.map((entry) => mapEntryApiToEntity(entry));
};

export { mapEntriesApiToEntities, mapEntryApiToEntity };
