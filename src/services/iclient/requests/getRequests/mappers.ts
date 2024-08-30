import { ITag } from "@inubekit/tag";
import { requestStatusDM } from "src/model/domains/credits/requestStatusDM";

import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { IRequest } from "src/model/entity/request";
import { IValidation, ValidationValueType } from "src/model/entity/service";
import { capitalizeText, correctSpecialCharacters } from "src/utils/texts";
import { IRequirementResponse } from "../../credits/getRequirements/types";

const requestStatusAppearance: Record<string, ITag["appearance"]> = {
  Created: "warning",
  InStudy: "warning",
  InProgress: "warning",
  InDisbursement: "warning",
  Completed: "success",
  Rejected: "danger",
};

const requestTitles: Record<string, string> = {
  credit: "Credito",
};

const requestDescriptions: Record<string, string> = {
  credit: "Solicitud de credito",
};

const mapRequirementApiToEntity = (
  requirement: Record<string, string | number | object>,
): IValidation => {
  const resultValues: Record<string, ValidationValueType> = {
    CUMPLE: "success",
    NO_CUMPLE: "fail",
  };

  return {
    id: String(requirement.requirementCode),
    label: capitalizeText(
      correctSpecialCharacters(String(requirement.requirementName)),
    ),
    failDetails: capitalizeText(
      correctSpecialCharacters(String(requirement.errorDescription)),
    ),
    value: resultValues[String(requirement.responseCode)] || "pending",
    documentType: requirement.documentTypeCode
      ? String(requirement.documentTypeCode)
      : undefined,
  };
};

const mapRequirementsApiToEntities = (
  requirements: Record<string, string | number | object>[],
): IRequirementResponse => {
  const validations = Array.isArray(Object(requirements).validations)
    ? Object(requirements).validations
    : [];

  const documents = Array.isArray(Object(requirements).documents)
    ? Object(requirements).documents
    : [];

  return {
    validations: validations.map(
      (requirement: Record<string, string | number | object>) =>
        mapRequirementApiToEntity(requirement),
    ),
    documents: documents.map(
      (requirement: Record<string, string | number | object>) =>
        mapRequirementApiToEntity(requirement),
    ),
  };
};

const mapRequestApiToEntity = (
  request: Record<string, string | number | object>,
): IRequest => {
  const requirementsApi = {
    validations: Object(request).details.systemRequirements,
    documents: Object(request).details.documentRequirements,
  };

  const requirements = mapRequirementsApiToEntities(Object(requirementsApi));

  return {
    id: String(request.productRequestId),
    title: requestTitles[String(request.requestType)] || "",
    product: capitalizeText(String(Object(request).details.productDetail)),
    destination: capitalizeText(
      String(Object(request).details.destinationDetail),
    ),
    trackingCode: String(request.cus),
    requestDate: new Date(String(request.requestDate)),
    description: requestDescriptions[String(request.requestType)] || "",
    status:
      requestStatusDM.valueOf(Object(request.status).code)?.id ||
      requestStatusDM.IN_STUDY.id,
    value: Number(Object(request).details.conditions.requestedAmount),
    quotaValue: Number(Object(request).details.conditions.quotaValue),
    periodicity:
      periodicityDM.valueOf(
        Object(request).details.conditions.capitalPeriodicity,
      )?.value || "",
    deadline: String(Object(request).details.conditions.quotas),
    interestRate: Number(
      Object(request).details.conditions.remunerativeInterestRate,
    ),
    netValue: Number(
      Object(request).details.conditions.disbursementDetails
        .netDisbursementApprox,
    ),
    tag: {
      label:
        requestStatusDM.valueOf(Object(request.status).code)?.value ||
        requestStatusDM.IN_STUDY.value,
      appearance:
        requestStatusAppearance[Object(request.status).code] || "warning",
    },
    validations: requirements.validations,
    documentaryRequirements: [],
  };
};

const mapRequestsApiToEntities = (
  requests: Record<string, string | number | object>[],
): IRequest[] => {
  return requests.map((request) => mapRequestApiToEntity(request));
};

export { mapRequestApiToEntity, mapRequestsApiToEntities };
