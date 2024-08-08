interface ISaveDocumentRequest {
  documentType: string;
  file: File;
}

interface ISaveDocumentResponse {
  documentType: string;
  fileName: string;
  sequence: number;
}

export type { ISaveDocumentRequest, ISaveDocumentResponse };
