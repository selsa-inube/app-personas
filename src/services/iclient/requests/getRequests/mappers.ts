import { ITag } from "@inubekit/tag";
import { requestStatusDM } from "src/model/domains/credits/requestStatusDM";

import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { IRequest } from "src/model/entity/request";
import {
  ISelectedDocument,
  IValidation,
  ValidationValueType,
} from "src/model/entity/service";
import { capitalizeText, correctSpecialCharacters } from "src/utils/texts";

const requestStatusAppearance: Record<string, ITag["appearance"]> = {
  Received: "warning",
  Filed: "warning",
  InStudy: "warning",
  Approved: "success",
  Rejected: "danger",
  InDisbursement: "warning",
  Completed: "success",
  Cancelled: "danger",
};

const requestTitles: Record<string, string> = {
  credit: "Crédito",
  aid: "Auxilio",
};

const requestDescriptions: Record<string, string> = {
  credit: "Solicitud de crédito",
  aid: "Solicitud de auxilio",
};

const mapValidationApiToEntity = (
  validation: Record<string, string | number | object>,
): IValidation => {
  const resultValues: Record<string, ValidationValueType> = {
    CUMPLE: "success",
    NO_CUMPLE: "fail",
  };

  return {
    id: String(validation.requirementCode),
    label: capitalizeText(
      correctSpecialCharacters(String(validation.requirementName)),
    ),
    failDetails: validation.errorDescription
      ? capitalizeText(
          correctSpecialCharacters(String(validation.errorDescription)),
        )
      : "",
    value: resultValues[String(validation.responseCode)] || "pending",
  };
};

const mapDocumentApiToEntity = (
  document: Record<string, string | number | object>,
): ISelectedDocument => {
  const fileType = String(document.documentType).split(".")[1];

  return {
    requirementId: String(document.documentTypeCode),
    id: String(document.fileName),
    file: new File([""], String(document.fileName), {
      type: fileType,
    }),
    documentType: String(document.documentTypeCode),
    sequence: Number(document.sequence),
  };
};

const mapRequirementsApiToEntities = (
  requirements: Record<string, string | number | object>[],
): {
  validations: IValidation[];
  documents: ISelectedDocument[];
} => {
  const validations = Array.isArray(Object(requirements).validations)
    ? Object(requirements).validations
    : [];

  const documents = Array.isArray(Object(requirements).documents)
    ? Object(requirements).documents
    : [];

  return {
    validations: validations.map(
      (requirement: Record<string, string | number | object>) =>
        mapValidationApiToEntity(requirement),
    ),
    documents: documents.map(
      (requirement: Record<string, string | number | object>) =>
        mapDocumentApiToEntity(requirement),
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

  const requestedAmount = Object(request).details?.conditions?.requestedAmount;
  const requestedValue = Object(request).details?.requestedValue;

  const aidType = Object(request).details?.aidType;

  return {
    id: String(request.productRequestId),
    requestType: Object(request.requestType).code,
    title: requestTitles[Object(request.requestType).code] || "",
    product: capitalizeText(
      String(
        Object(request).details.productDetail ||
          Object(request).details.aidDescription,
      ),
    ),
    destination: capitalizeText(
      String(Object(request).details.destinationDetail || ""),
    ),
    beneficiary: capitalizeText(
      String(Object(request).details.beneficiary.customerName || ""),
    ),
    trackingCode: request.requestNumber ? String(request.requestNumber) : "",
    requestDate: new Date(String(request.requestDate)),
    description: requestDescriptions[Object(request.requestType).code] || "",
    status:
      requestStatusDM.valueOf(Object(request.status).code)?.id ||
      requestStatusDM.RECEIVED.id,
    value: Number(requestedAmount ? requestedAmount : requestedValue),
    quotaValue: Number(Object(request).details?.conditions?.quotaValue || 0),
    periodicity:
      periodicityDM.valueOf(
        Object(request).details?.conditions?.capitalPeriodicity || "",
      )?.value || "",
    deadline: String(Object(request).details?.conditions?.quotas || ""),
    interestRate: Number(
      Object(request).details?.conditions?.remunerativeInterestRate || 0,
    ),
    netValue: Number(
      Object(request).details?.conditions?.disbursementDetails
        ?.netDisbursementApprox || 0,
    ),
    tag: {
      label:
        requestStatusDM.valueOf(Object(request.status).code)?.value ||
        requestStatusDM.RECEIVED.value,
      appearance:
        requestStatusAppearance[Object(request.status).code] || "warning",
    },
    detailsSituation: String(Object(request).details?.comments || ""),
    validations: requirements.validations,
    documentaryRequirements: requirements.documents,
    aidType: aidType ? String(aidType) : undefined,
  };
};

const mapRequestsApiToEntities = (
  requests: Record<string, string | number | object>[],
): IRequest[] => {
  return requests.map((request) => mapRequestApiToEntity(request));
};

export { mapRequestApiToEntity, mapRequestsApiToEntities };
