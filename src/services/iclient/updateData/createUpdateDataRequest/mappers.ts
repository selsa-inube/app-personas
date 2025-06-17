import { IUpdateDataRequest, IUpdateDataResponse } from "./types";

const mapRequestUpdateDataEntityToApi = (
  updateData: IUpdateDataRequest,
): Record<string, string | number | object> => {
  delete updateData.personalInformation.currentData;
  delete updateData.contactData.currentData;
  delete updateData.bankTransfers.currentData;

  const [accountTypeCode, accountTypeName] =
    updateData.bankTransfers.accountType
      .split("-", 2)
      .map((part) => part.trim());

  return {
    clientCode: updateData.customerCode,
    details: {
      personalInformation: {
        ...updateData.personalInformation,
        identificationType:
          updateData.personalInformation.identificationType.id,
      },
      contactData: {
        ...updateData.contactData,
      },
      bankTransferData: {
        bankCode: updateData.bankTransfers.bankEntityCode,
        bankName: updateData.bankTransfers.bankEntityName,
        accountNumber: updateData.bankTransfers.accountNumber,
        accountTypeCode,
        accountTypeName,
      },
    },
    issuer: "Personas",
    requestType: "updatedata",
  };
};

const mapRequestUpdateDataApiToEntity = (
  updateData: Record<string, string | object>,
): IUpdateDataResponse => {
  return {
    cus: String(updateData.cus),
    requestId: String(updateData.productRequestId),
    requestDate: new Date(String(updateData.requestDate)),
    status: String(updateData.status),
  };
};
export { mapRequestUpdateDataApiToEntity, mapRequestUpdateDataEntityToApi };
