interface IRemoveDocumentRequest {
  documentType: string;
  file: File;
}

interface IRemoveDocumentResponse {
  documentType: string;
  fileName: string;
  sequence: number;
}

export type { IRemoveDocumentRequest, IRemoveDocumentResponse };
