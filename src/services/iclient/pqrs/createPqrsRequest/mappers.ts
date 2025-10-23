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
      documentTypeCode: document.documentType,
      sequence: document.sequence?.toString(),
      fileName: document.file.name,
      requirementCode: document.id,
      requirementName: document.label,
      profile: document.profile,
      responseCode: document.responseCode,
      evaluationDescription: document.evaluationDescription,
      documentTypeDescription: document.documentTypeDescription,
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

export { mapRequestPqrsApiToEntity, mapRequestPqrsEntityToApi };
