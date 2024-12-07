import { IRequestPqrs, IRequestPqrsResponse } from "./types";

const mapRequestPqrsEntityToApi = (
  pqrsRequest: IRequestPqrs,
): Record<string, string | number | object> => {
  return {
    description: pqrsRequest.description,
    clientCode: pqrsRequest.clientCode,
    typeCode: pqrsRequest.typeCode,
    typeName: pqrsRequest.typeName,
    reasonCode: pqrsRequest.reasonCode,
    reasonName: pqrsRequest.reasonName,
    placeCode: pqrsRequest.placeCode,
    placeName: pqrsRequest.placeName,
    documentDetails: pqrsRequest.documentDetails.map((document) => ({
      documentTypeCode: document.documentTypeCode,
      sequence: document.sequence,
      fileName: document.fileName,
    })),
  };
};

const mapRequestPqrsApiToEntity = (
  pqrsRequest: Record<string, string | object>,
): IRequestPqrsResponse => {
  return {
    pqrsId: String(pqrsRequest.pqrsId),
    cus: String(pqrsRequest.cus),
    requestDate: new Date(String(pqrsRequest.requestDate)),
    status: String(pqrsRequest.status),
  };
};

export { mapRequestPqrsEntityToApi, mapRequestPqrsApiToEntity };
