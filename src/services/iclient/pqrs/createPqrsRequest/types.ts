import { ISelectedDocument } from "src/model/entity/service";

interface IRequestPqrs {
  description: string;
  clientCode: string;
  typeCode: string;
  typeName: string;
  reasonCode: string;
  reasonName: string;
  placeCode: string;
  placeName: string;
  documentDetails: ISelectedDocument[];
}

interface IRequestPqrsResponse {
  pqrsId: string;
  cus: string;
  status: string;
  requestDate: Date;
}

export type { IRequestPqrs, IRequestPqrsResponse };
