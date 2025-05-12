import { IRegisterInEventRequest, IRegisterInEventResponse } from "./types";

const mapRequestCreditEntityToApi = (
  registrationRequest: IRegisterInEventRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: registrationRequest.customerCode,
    details: {
      eventId: registrationRequest.eventId,
      entries: registrationRequest.entries.map((entry) => ({
        id: entry.id,
        name: entry.name,
        value: entry.value,
        subsidyValue: entry.subsidyValue,
        subsidyName: entry.subsidyName,
        count: entry.count,
        subTotal: entry.subTotal,
      })),
      totalValue: registrationRequest.totalValue,
      paymentMethod: {
        paymentType: registrationRequest.paymentMethod.paymentType,
        accountNumber: registrationRequest.paymentMethod.accountNumber,
        descriptionPayment:
          registrationRequest.paymentMethod.descriptionPayment,
        value: registrationRequest.paymentMethod.value,
      },
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
    requestType: "registerInEvent",
  };
};

const mapRequestCreditApiToEntity = (
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
export { mapRequestCreditApiToEntity, mapRequestCreditEntityToApi };
