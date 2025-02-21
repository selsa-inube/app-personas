import { IUpdateDataRequest, IUpdateDataResponse } from "./types";

const mapRequestUpdateDataEntityToApi = (
  updateData: IUpdateDataRequest,
): Record<string, string | number | object> => {
  return {
    customerCode: updateData.customerCode,
    personalInformation: updateData.personalInformation,
  };
};

const mapRequestUpdateDataApiToEntity = (
  updateData: Record<string, string | object>,
): IUpdateDataResponse => {
  return {
    cus: String(updateData.cus),
    requestId: String(updateData.requestId),
    requestDate: new Date(String(updateData.requestDate)),
    status: String(updateData.status),
  };
};
export { mapRequestUpdateDataApiToEntity, mapRequestUpdateDataEntityToApi };
