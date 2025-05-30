import { IValidation, ValidationValueType } from "src/model/entity/service";
import { capitalizeText, correctSpecialCharacters } from "src/utils/texts";
import { IRequirementRequest, IRequirementResponse } from "./types";

const mapRequirementEntityToApi = (
  requirement: IRequirementRequest,
): Record<string, string | number | object | undefined> => {
  const disbursementMethod = {
    disbursementMethodCode: requirement.disbursementMethod?.id,
    disbursementMethodDetail: requirement.disbursementMethod?.name,
    savingsAccountNumber: requirement.disbursementMethod?.accountNumber,
    accountNumber: requirement.disbursementMethod?.transferAccountNumber,
    accountTypeCode: requirement.disbursementMethod?.transferAccountType,
    accountTypeDetail: requirement.disbursementMethod?.transferBankEntity,
    bankCode: requirement.disbursementMethod?.transferBankEntity,
    bankDetail: requirement.disbursementMethod?.transferBankEntity,
    businessName: requirement.disbursementMethod?.businessName,
    firstName: requirement.disbursementMethod?.firstName,
    genderCode: requirement.disbursementMethod?.gender,
    genderDetail: requirement.disbursementMethod?.genderName,
    identificationDetail: requirement.disbursementMethod?.identification,
    identificationNumber: requirement.disbursementMethod?.identification,
    identificationTypeCode: requirement.disbursementMethod?.identificationType,
    lastName: requirement.disbursementMethod?.lastName,
  };

  if (requirement.requestType === "aid" && requirement.aidData) {
    return {
      requestType: requirement.requestType,
      customerCode: requirement.customerCode,
      customerName: requirement.customerName,
      requestDate: requirement.requestDate.toISOString(),
      aidData: {
        aidCode: requirement.aidData.productId,
        aidName: requirement.aidData.productName,
        requestAmount: requirement.aidData.amount,
        aidBeneficiary: {
          relationship: requirement.aidData.beneficiary?.relationship,
          customerCode: requirement.aidData.beneficiary?.identificationNumber,
          customerName: requirement.aidData.beneficiary?.name,
        },
        disbursementMethod,
      },
    };
  }

  if (
    requirement.requestType === "newprogrammedsaving" &&
    requirement.programmedSavingData
  ) {
    return {
      requestType: requirement.requestType,
      customerCode: requirement.customerCode,
      customerName: requirement.customerName,
      requestDate: requirement.requestDate.toISOString(),
      programmedSavingData: {
        conditions: {
          actionAfterExpiration:
            requirement.programmedSavingData.actionAfterExpiration,
          numQuotas: requirement.programmedSavingData.deadline,
          paymentMethod: requirement.programmedSavingData.paymentMethod,
          paymentMethodName: requirement.programmedSavingData.paymentMethodName,
          periodicity: requirement.programmedSavingData.periodicity,
          quotaValue: requirement.programmedSavingData.quota,
        },
        savingCode: requirement.programmedSavingData.productId,
        savingName: requirement.programmedSavingData.productName,
        disbursementMethod,
      },
    };
  }

  if (requirement.requestType === "credit" && requirement.creditData) {
    return {
      requestType: requirement.requestType,
      customerCode: requirement.customerCode,
      customerName: requirement.customerName,
      requestDate: requirement.requestDate.toISOString(),
      creditData: {
        productId: requirement.creditData.productId,
        productName: requirement.creditData.productName,
        destinationId: requirement.creditData.destinationId,
        destinationName: requirement.creditData.destinationName,
        paymentMethod: requirement.creditData.paymentMethod,
        paymentMethodName: requirement.creditData.paymentMethodName,
        requestAmount: requirement.creditData.amount,
        creditAmount: requirement.creditData.amount,
        numQuotas: requirement.creditData.deadline,
        nominalRate: requirement.creditData.rate,
        amortizationType: requirement.creditData.amortizationType,
        periodicity: requirement.creditData.periodicity,
        quotaValue: requirement.creditData.quota,
        amountToTurn: requirement.creditData.netValue,
        disbursementMethod,
      },
    };
  }

  if (requirement.requestType === "newcdat" && requirement.cdatData) {
    return {
      requestType: requirement.requestType,
      customerCode: requirement.customerCode,
      customerName: requirement.customerName,
      requestDate: requirement.requestDate.toISOString(),
      cdatData: {
        amount: requirement.cdatData.amount,
        cdatType: requirement.cdatData.productId,
        collectMethods: requirement.cdatData.moneySources.map((source) => ({
          accountNumber: source.accountNumber,
          code: source.type,
          value: source.value,
          detail: source.name,
        })),
        deadline: Number(requirement.cdatData.deadline),
        interestRate: requirement.cdatData.rate,
        disbursementMethod,
      },
    };
  }

  if (
    requirement.requestType === "registerinevent" &&
    requirement.registerInEventData
  ) {
    return {
      requestType: requirement.requestType,
      customerCode: requirement.customerCode,
      customerName: requirement.customerName,
      requestDate: requirement.requestDate.toISOString(),
      registerInEventData: {
        productCode: requirement.registerInEventData.productCode,
        eventType: requirement.registerInEventData.eventType,
        totalServiceValue: requirement.registerInEventData.totalServiceValue,
        totalSubsidyValue: requirement.registerInEventData.totalSubsidyValue,
        totalValue: requirement.registerInEventData.totalValue,
        collectMethod: {
          code: requirement.registerInEventData.collectMethod.type,
          detail: requirement.registerInEventData.collectMethod.name,
          accountNumber:
            requirement.registerInEventData.collectMethod.accountNumber,
          value: requirement.registerInEventData.collectMethod.value,
        },
        entriesCategories:
          requirement.registerInEventData.entriesCategories?.map(
            (category) => ({
              id: category.id,
              name: category.name,
              value: category.value,
              subsidyValue: category.subsidyValue,
              subsidyName: category.subsidyName,
              count: category.count,
              fullValue: category.fullValue,
              subTotal: category.subTotal,
            }),
          ) || [],
      },
    };
  }

  return {};
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
      correctSpecialCharacters(String(requirement.errorDescription || "")),
    ),
    value: resultValues[String(requirement.responseCode)] || "pending",
    documentType: requirement.documentTypeCode
      ? String(requirement.documentTypeCode)
      : undefined,
    profile: requirement.profile ? String(requirement.profile) : undefined,
    responseCode: String(requirement.responseCode) || "",
    evaluationDescription:
      String(requirement.responseCode) === "CUMPLE"
        ? "Verificación exitosa"
        : "",
    required: !!requirement.isMandatory,
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

export {
  mapRequirementApiToEntity,
  mapRequirementEntityToApi,
  mapRequirementsApiToEntities,
};
