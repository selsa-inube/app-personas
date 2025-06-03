import { IRegisterInEventRequest, IRegisterInEventResponse } from "./types";

const mapRequestRegisterInEventEntityToApi = (
  registrationRequest: IRegisterInEventRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: registrationRequest.customerCode,
    details: {
      typeEvent: registrationRequest.event.eventType,
      typeDocument: registrationRequest.event.documentType,
      documentNumber: registrationRequest.event.documentNumber,
      branch: registrationRequest.event.branch,
      event: registrationRequest.event,
      entriesCategories: registrationRequest.entries.map((entry) => ({
        id: entry.id,
        name: entry.name,
        value: entry.value,
        subsidyValue: entry.subsidyValue,
        subsidyName: entry.subsidyName,
        count: entry.count,
        fullValue: entry.fullValue,
        subTotal: entry.subTotal,
      })),
      totalServiceValue: registrationRequest.totalServiceValue,
      totalSubsidyValue: registrationRequest.totalSubsidyValue,
      totalValue: registrationRequest.totalValue,
      paymentMethod: {
        code: registrationRequest.paymentMethod.paymentType,
        accountNumber: registrationRequest.paymentMethod.accountNumber,
        value: registrationRequest.paymentMethod.value,
      },
      participants: registrationRequest.participants,
      systemRequirements: registrationRequest.validations.map((validation) => ({
        evaluationDescription: validation.evaluationDescription,
        profile: validation.profile,
        requirementCode: validation.id,
        requirementName: validation.label,
        responseCode: validation.responseCode,
      })),
      acceptances: {
        codes: registrationRequest.termsConditions.ids,
        description: registrationRequest.termsConditions.description,
      },
    },
    issuer: "Personas",
    requestType: "registerinevent",
  };
};

const mapRequestRegisterInEventApiToEntity = (
  registrationRequest: Record<string, string | object>,
): IRegisterInEventResponse => {
  return {
    cus: String(registrationRequest.cus),
    destination: String(registrationRequest.destinationCode),
    productRequestId: String(registrationRequest.productRequestId),
    requestDate: new Date(String(registrationRequest.requestDate)),
    status: String(registrationRequest.status),
  };
};
export {
  mapRequestRegisterInEventApiToEntity,
  mapRequestRegisterInEventEntityToApi,
};
