import { ITag } from "@inubekit/inubekit";
import { requestStatusDM } from "src/model/domains/credits/requestStatusDM";

import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { actionExpirationDM } from "src/model/domains/savings/actionExpirationDM";
import { aidTypeDM } from "src/model/domains/services/aids/aidTypeDM";
import { IRequest, RequestType } from "src/model/entity/request";
import {
  ISelectedDocument,
  IValidation,
  ValidationValueType,
} from "src/model/entity/service";
import { currencyFormat } from "src/utils/currency";
import { capitalizeText, correctSpecialCharacters } from "src/utils/texts";

const requestStatusAppearance: Record<string, ITag["appearance"]> = {
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

const requestTitles: Record<RequestType, string> = {
  credit: "Crédito",
  aid: "Auxilio",
  newprogrammedsaving: "Ahorro programado a término fijo",
  newcdat: "CDAT",
  cancelprogrammedsaving: "Cancelación anticipada de ahorro programado",
  modifydeadlineactionprogrammedsaving:
    "Modificar acción al vencimiento de ahorro programado",
  cancelcdat: "Cancelación anticipada de CDAT",
  modifyquotavalueprogrammedsaving: "Modificar cuota de ahorro programado",
  modifydeadlineactioncdat: "Modificar acción al vencimiento de CDAT",
  updatedata: "Actualización de datos",
};

const requestDescriptions: Record<RequestType, string> = {
  credit: "Solicitud de crédito",
  aid: "Solicitud de auxilio",
  newprogrammedsaving: "Solicitud de ahorro programado a término fijo",
  newcdat: "Solicitud de CDAT",
  cancelprogrammedsaving: "Cancelación anticipada de ahorro programadO",
  modifydeadlineactionprogrammedsaving:
    "Modificar acción al vencimiento de ahorro programado",
  cancelcdat: "Cancelación anticipada de CDAT",
  modifydeadlineactioncdat: "Modificar acción al vencimiento de CDAT",
  modifyquotavalueprogrammedsaving: "Modificar cuota de ahorro programado",
  updatedata: "Actualización de datos",
};

const actionExpirationLabel: Record<string, string> = {
  AutomaticRenewalAtExpiration: "Renovación automática al vencimiento",
  PayAtExpiration: "Al vencimiento",
  DecideToRenewAtALaterDate: "Renovar en una fecha posterior",
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
  requirements: Record<string, string | number | object>,
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
  const details = Object(request).details || {};
  const conditions = Object(details).conditions || {};
  const disbursementMethod = Object(details).disbursementMethod || {};
  const requirementsApi = {
    validations: Object(details).systemRequirements,
    documents: Object(details).documentRequirements,
  };

  const requirements = mapRequirementsApiToEntities(requirementsApi);
  const requestTypeCode = Object(request.requestType).code as RequestType;
  const requestStatusCode = Object(request.status).code;

  const requestData: IRequest = {
    id: String(request.productRequestId),
    requestType: requestTypeCode,
    title: requestTitles[requestTypeCode as RequestType] || "",
    destination: capitalizeText(
      String(Object(details).destinationDescription || ""),
    ),
    trackingCode: request.requestNumber ? String(request.requestNumber) : "",
    requestDate: new Date(String(request.requestDate)),
    description: requestDescriptions[requestTypeCode as RequestType] || "",
    status:
      requestStatusDM.valueOf(requestStatusCode)?.id ||
      requestStatusDM.RECEIVED.id,
    periodicity:
      periodicityDM.valueOf(Object(conditions).capitalPeriodicity || "")
        ?.value || "",
    interestRate: Number(Object(conditions).remunerativeInterestRate || 0),
    netValue: Number(
      Object(conditions).disbursementDetails?.netDisbursementApprox || 0,
    ),
    tag: {
      label:
        requestStatusDM.valueOf(requestStatusCode)?.value ||
        requestStatusDM.RECEIVED.value,
      appearance: requestStatusAppearance[requestStatusCode] || "warning",
    },
    detailsSituation: String(Object(details).comments || ""),
    validations: requirements.validations,
    documentaryRequirements: requirements.documents,
  };

  switch (requestTypeCode) {
    case "aid":
      if (Object(request).aidType?.code)
        requestData.aidType = Object(request).aidType.code;
      if (Object(details).beneficiary) {
        requestData.beneficiary = capitalizeText(
          String(Object(details).beneficiary.customerName || ""),
        );
      }
      requestData.product = capitalizeText(
        String(Object(details).productDescription || ""),
      );

      if (Object(request).aidType.code === aidTypeDM.REQUIRED_DAYS.id) {
        requestData.label = `${Object(details).requestedValue} Días`;
      } else {
        requestData.value = Number(Object(details).requestedValue || 0);
      }

      break;

    case "newprogrammedsaving":
      requestData.product = capitalizeText(String(Object(details).productName));
      requestData.periodicityName = String(
        periodicityDM.valueOf(Object(conditions).periodicity || "")?.value ||
          "",
      );
      requestData.paymentMethodName = String(
        Object(conditions).paymentMethodName || "",
      );
      requestData.disbursementMethodName = String(
        Object(disbursementMethod).disbursementMethodDetail || "",
      );
      requestData.disbursementAccount = String(
        Object(disbursementMethod).savingsAccountNumber || "",
      );

      requestData.quotaValue = String(Object(conditions).quotaValue || 0);
      requestData.deadline = String(
        Object(conditions).quotas || Object(conditions).numQuotas,
      );

      requestData.label = `${currencyFormat(Number(Object(conditions).quotaValue))} / ${periodicityDM.valueOf(Object(conditions).periodicity || "")?.value}`;

      break;
    case "credit":
      requestData.quotaValue = String(Object(conditions).quotaValue || 0);
      requestData.deadline = String(
        Object(conditions).quotas || Object(conditions).numQuotas,
      );
      requestData.product = capitalizeText(
        String(Object(details).productDescription || ""),
      );

      requestData.value = Number(Object(conditions).requestedAmount || 0);

      break;
    case "newcdat":
      requestData.deadline = `${String(Object(details).termInDays)} días`;
      requestData.actionAfterExpiration =
        actionExpirationLabel[
          String(Object(details).actionAfterExpiration) || ""
        ];
      requestData.paymentMethodName = String(
        Object(details).paymentMethod?.descriptionPayment || "",
      );
      requestData.disbursementMethodName = String(
        Object(disbursementMethod).disbursementMethodDetail || "",
      );
      requestData.disbursementAccount = String(
        Object(disbursementMethod).savingsAccountNumber || "",
      );

      requestData.value = Number(Object(details).requestedAmount || 0);
      break;
    case "cancelprogrammedsaving":
    case "cancelcdat":
      requestData.product = String(Object(details).productNumber);
      break;
    case "modifydeadlineactionprogrammedsaving":
    case "modifydeadlineactioncdat":
      requestData.product = String(Object(details).productNumber);
      requestData.actionAfterExpiration = actionExpirationDM.valueOf(
        String(Object(details).actionAfterExpiration) || "",
      )?.value;
      break;
    case "modifyquotavalueprogrammedsaving":
      requestData.product = String(Object(details).productNumber);
      requestData.quotaValue = currencyFormat(Object(details).quotaValue || 0);
      break;
    case "updatedata":
      requestData.customerName = `${String(
        Object(details).personalInformation.firstName || "",
      )} ${String(Object(details).personalInformation.secondName || "")} ${String(
        Object(details).personalInformation.firstLastName || "",
      )} ${String(Object(details).personalInformation.secondLastName || "")}`;

      requestData.customerCode = String(request.clientCode || "");

      requestData.identificationType = String(
        Object(details).personalInformation.identificationType || "",
      );

      requestData.countryName = String(
        Object(details)?.contactData?.countryName || "",
      );

      requestData.departmentName = String(
        Object(details)?.contactData?.departmentName || "",
      );

      requestData.cityName = String(
        Object(details)?.contactData?.cityName || "",
      );

      requestData.address = String(Object(details)?.contactData?.address || "");

      requestData.zipCode = String(Object(details)?.contactData?.zipCode || "");

      requestData.landlinePhone = String(
        Object(details)?.contactData?.landlinePhone || "",
      );

      requestData.cellPhone = String(
        Object(details)?.contactData?.cellPhone || "",
      );

      requestData.email = String(Object(details)?.contactData?.email || "");
      break;
  }

  return requestData;
};

const mapRequestsApiToEntities = (
  requests: Record<string, string | number | object>[],
): IRequest[] => {
  return requests.map((request) => mapRequestApiToEntity(request));
};

export { mapRequestApiToEntity, mapRequestsApiToEntities };
