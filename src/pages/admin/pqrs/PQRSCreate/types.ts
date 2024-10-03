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

export type { ICreatePQRSEntry, ISelectedDocument };
