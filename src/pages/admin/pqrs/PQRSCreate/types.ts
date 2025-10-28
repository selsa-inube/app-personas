import { ISelectedDocument } from "src/model/entity/service";

interface ICreatePQRSEntry {
  type: string;
  motive: string;
  attentionPlace: string;
  description: string;
  documents?: ISelectedDocument[];
}

interface ITypePqrs {
  typeCode: string;
  typeName: string;
  isCapturedAttentionPoint: boolean;
  reasons: IReasonPqrs[];
  alias: string;
  publish: boolean;
}

interface IReasonPqrs {
  reasonCode: string;
  reasonName: string;
}

export type { ICreatePQRSEntry, IReasonPqrs, ISelectedDocument, ITypePqrs };
