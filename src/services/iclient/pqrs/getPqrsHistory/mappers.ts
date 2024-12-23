import { ITag } from "@inubekit/tag";
import { pqrsStatusDM } from "src/model/domains/pqrs/pqrsStatusDM";
import { IPQRS } from "src/model/entity/pqrs";

const pqrsStatusAppearance: Record<string, ITag["appearance"]> = {
  PendingClassification: "warning",
  Resolved: "success",
  Finished: "success",
  Received: "warning",
  InProcess: "warning",
  ReopenIncident: "warning",
};

const mapPqrsHistoryApiToEntity = (
  pqrs: Record<string, string | number | object>,
): IPQRS => {
  const statusCode = String(
    (pqrs.status as Record<string, string>)?.code || "",
  );
  return {
    id: String(pqrs.pqrsId),
    title: "PQRS",
    motive: String(pqrs.reasonName),
    code: String(pqrs.requestNumber),
    date: new Date(String(pqrs.requestDate)),
    tag: {
      label: pqrsStatusDM.valueOf(statusCode)?.value || "",
      appearance: pqrsStatusAppearance[statusCode] || "primary",
    },
    description: String(pqrs.description),
    type: String(pqrs.typeName),
    attentionPlace: String(pqrs.placeName),
    details: String(pqrs.description),
  };
};

const mapPqrsHistoryApiToEntities = (
  transferHistory: Record<string, string | number | object>[] = [],
): IPQRS[] => {
  return transferHistory
    .map((transfer) => mapPqrsHistoryApiToEntity(transfer))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

export { mapPqrsHistoryApiToEntity, mapPqrsHistoryApiToEntities };
