import { ITag } from "@inubekit/inubekit";
import { requestStatusDM } from "src/model/domains/credits/requestStatusDM";

import { IRequest } from "src/model/entity/request";

const entryStatusAppearance: Record<string, ITag["appearance"]> = {
  Received: "warning",
  Filed: "warning",
  InStudy: "warning",
  Approved: "success",
  Rejected: "danger",
  InDisbursement: "warning",
  Completed: "success",
  Finished: "success",
  Cancelled: "danger",
  CollectPending: "warning",
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
    trackingCode: entry.entryNumber ? String(entry.entryNumber) : "",
    requestDate: new Date(String(entry.requestDate)),
    description: event?.description || "",
    status:
      requestStatusDM.valueOf(entryStatusCode)?.id ||
      requestStatusDM.RECEIVED.id,
    tag: {
      label:
        requestStatusDM.valueOf(entryStatusCode)?.value ||
        requestStatusDM.RECEIVED.value,
      appearance: entryStatusAppearance[entryStatusCode] || "warning",
    },
    event: event,
    entriesCategories: details.entriesCategories,
    paymentMethodName: details.paymentMethod?.detail || "",
    accountToDebit: details.paymentMethod?.accountToDebit || "",
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
