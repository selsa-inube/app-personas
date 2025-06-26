import { ITag } from "@inubekit/inubekit";
import { requestEntryStatusDM } from "src/model/domains/events/requestEntryStatusDM";

import { IRequest } from "src/model/entity/request";

const entryStatusAppearance: Record<string, ITag["appearance"]> = {
  PendingRequirements: "warning",
  Finished: "success",
  Cancelled: "danger",
  CollectPending: "warning",
  Filed: "warning",
  Received: "warning",
};

const mapEntryApiToEntity = (
  entry: Record<string, string | number | object>,
): IRequest => {
  const details = Object(entry).details || {};

  const event = details.event;
  const entryStatusCode = Object(entry.status).code;

  const entryData: IRequest = {
    id: String(entry.productRequestId),
    requestType: "registerinevent",
    title: event?.title || "",
    trackingCode: entry.requestNumber ? String(entry.requestNumber) : "",
    requestDate: new Date(String(entry.requestDate)),
    description: event?.description || "",
    status:
      requestEntryStatusDM.valueOf(entryStatusCode)?.id ||
      requestEntryStatusDM.PENDING_REQUIREMENTS.id,
    tag: {
      label:
        requestEntryStatusDM.valueOf(entryStatusCode)?.value ||
        requestEntryStatusDM.PENDING_REQUIREMENTS.value,
      appearance: entryStatusAppearance[entryStatusCode] || "warning",
    },
    events: {
      event: event,
      entriesCategories: details.entriesCategories,
      participants: details.participants || [],
    },
    accountToDebit: details.paymentMethod?.accountToDebit || "",
    paymentMethodName: details.paymentMethod?.detail || "",
    accountNumber: details.paymentMethod?.accountNumber || "",
    value: details.totalValue || 0,
  };

  return entryData;
};

const mapEntriesApiToEntities = (
  entries: Record<string, string | number | object>[],
): IRequest[] => {
  return entries.map((entry) => mapEntryApiToEntity(entry));
};

export { mapEntriesApiToEntities, mapEntryApiToEntity };
