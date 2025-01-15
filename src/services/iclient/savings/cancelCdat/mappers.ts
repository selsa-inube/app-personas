import { ICancelCdatRequest, ICancelCdatResponse } from "./types";

const mapCancelCdatEntityToApi = (
  cdatRequest: ICancelCdatRequest,
): Record<string, string | number | object> => {
  return {
    clientCode: cdatRequest.customerCode,
    details: {
      productNumber: cdatRequest.savingNumber,
      disbursementMethod: {
        disbursementMethodCode: cdatRequest.disbursmentMethod.id,
        disbursementMethodDetail:
          cdatRequest.disbursmentMethod.name,
        savingsAccountNumber:
          cdatRequest.disbursmentMethod.accountNumber,
        accountNumber:
          cdatRequest.disbursmentMethod.transferAccountNumber,
        accountTypeCode:
          cdatRequest.disbursmentMethod.transferAccountType,
        accountTypeDetail:
          cdatRequest.disbursmentMethod.transferBankEntity,
        bankCode: cdatRequest.disbursmentMethod.transferBankEntity,
        bankDetail:
          cdatRequest.disbursmentMethod.transferBankEntity,
        businessName: cdatRequest.disbursmentMethod.businessName,
        firstName: cdatRequest.disbursmentMethod.firstName,
        secondName: cdatRequest.disbursmentMethod.secondName,
        genderCode: cdatRequest.disbursmentMethod.gender,
        genderDetail: cdatRequest.disbursmentMethod.genderName,
        identificationDetail:
          cdatRequest.disbursmentMethod.identification,
        identificationNumber:
          cdatRequest.disbursmentMethod.identification,
        identificationTypeCode:
          cdatRequest.disbursmentMethod.identificationType,
        firstLastName: cdatRequest.disbursmentMethod.firstLastName,
        secondLastName:
          cdatRequest.disbursmentMethod.secondLastName,
      },
    },
    issuer: "Personas",
    requestType: "cancelcdat",
  };
};

const mapCancelCdatApiToEntity = (
  cdatRequest: Record<string, string | object>,
): ICancelCdatResponse => {
  return {
    cus: String(cdatRequest.cus),
    destination: String(cdatRequest.destinationCode),
    productRequestId: String(cdatRequest.productRequestId),
    requestDate: new Date(String(cdatRequest.requestDate)),
    status: String(cdatRequest.status),
  };
};
export { mapCancelCdatApiToEntity, mapCancelCdatEntityToApi };
