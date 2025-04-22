import { IUpdateDataRequest, IUpdateDataResponse } from "./types";

const mapRequestUpdateDataEntityToApi = (
  updateData: IUpdateDataRequest,
): Record<string, string | number | object> => {
  delete updateData.personalInformation.currentData;
  delete updateData.contactData.currentData;

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
