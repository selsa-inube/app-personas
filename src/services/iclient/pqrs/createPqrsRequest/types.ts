interface IRequestPqrs {
  description: string;
  clientCode: string;
  typeCode: string;
  typeName: string;
  reasonCode: string;
  reasonName: string;
  placeCode: string;
  placeName: string;
  documentDetails: IDocumentDetail[];
}

interface IDocumentDetail {
  documentTypeCode: string;
  sequence: string;
  fileName: string;
}

interface IRequestPqrsResponse {
  pqrsId: string;
  cus: string;
  status: string;
  requestDate: Date;
}

export type { IRequestPqrs, IRequestPqrsResponse };
