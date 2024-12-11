interface ISelectedDocument {
  file: File;
  requirementId: string;
  id: string;
  documentType?: string;
}

interface ICreatePQRSEntry {
  type: string;
  motive: string;
  attentionPlace: string;
  email: string;
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

export type { ICreatePQRSEntry, ISelectedDocument, ITypePqrs, IReasonPqrs };
