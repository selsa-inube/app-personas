import { ITag } from "@inubekit/tag";
import { pqrsStatusDM } from "src/model/domains/pqrs/pqrsStatusDM";
import { IPQRS } from "src/model/entity/pqrs";
import { IPQRSDetails } from "./types";

const pqrsStatusAppearance: Record<string, ITag["appearance"]> = {
  PendingClassification: "warning",
  Resolved: "success",
  Finished: "success",
  Received: "warning",
  InProcess: "warning",
  ReopenIncident: "warning",
};

const mapPqrsDetailsApiToEntity = (pqrs: IPQRSDetails): IPQRS => {
  const statusCode = String(pqrs.status?.code || "");

  return {
    id: String(pqrs.eventId || ""),
    title: "PQRS",
    motive: String(pqrs.reasonName || ""),
    code: String(pqrs.cus || ""),
    date: new Date(pqrs.requestDate || Date.now()),
    tag: {
      label: pqrsStatusDM.valueOf(statusCode)?.value || "",
      appearance: pqrsStatusAppearance[statusCode] || "primary",
    },
    description: String(pqrs.description || ""),
    type: String(pqrs.typeName || ""),
    attentionPlace: String(pqrs.placeName || ""),
    details: String(pqrs.description || ""),
    file:
      pqrs.documentDetails?.map((doc) => ({
        id: doc.documentTypeCode,
        name: doc.fileName,
        size: 0,
      })) || [],
  };
};

export { mapPqrsDetailsApiToEntity };
