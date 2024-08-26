import { ITag } from "@inubekit/tag";
import { requestStatusDM } from "src/model/domains/credits/requestStatusDM";

import { IRequest } from "src/model/entity/request";

const requestStatusAppearance: Record<string, ITag["appearance"]> = {
  Created: "warning",
  InStudy: "warning",
  InProgress: "warning",
  InDisbursement: "warning",
  Completed: "success",
  Rejected: "danger",
};

const mapRequestApiToEntity = (
  request: Record<string, string | number | object>,
): IRequest => {
  return {
    id: String(request.requestId),
    title: String(request.title),
    product: String(request.product),
    destination: String(request.destination),
    trackingCode: String(request.trackingCode),
    requestDate: new Date(String(request.requestDate)),
    description: String(request.description),
    status: requestStatusDM.valueOf(String(request.status))?.id || "",
    value: Number(request.amount),
    quotaValue: Number(request.quotaValue),
    periodicity: String(request.periodicity),
    deadline: String(request.deadline),
    interestRate: Number(request.interestRate),
    netValue: Number(request.netValue),
    tag: {
      label: requestStatusDM.valueOf(String(request.status))?.value || "",
      appearance: requestStatusAppearance[String(request.status)],
    },
    validations: [],
    documentaryRequirements: [],
  };
};

const mapRequestsApiToEntities = (
  requests: Record<string, string | number | object>[],
): IRequest[] => {
  return requests.map((request) => mapRequestApiToEntity(request));
};

export { mapRequestApiToEntity, mapRequestsApiToEntities };
