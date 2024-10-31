import { ISaveDocumentRequest, ISaveDocumentResponse } from "./types";

const mapSaveDocumentEntityToApi = (
  saveDocument: ISaveDocumentRequest,
): FormData => {
  const fd = new FormData();

  fd.append("documentType", saveDocument.documentType);
  fd.append("identification", saveDocument.identificationNumber);
  fd.append("file", saveDocument.file);

  return fd;
};

const mapSaveDocumentApiToEntity = (
  saveDocument: Record<string, string | number | object>,
): ISaveDocumentResponse => {
  return {
    documentType: String(saveDocument.documentType),
    fileName: String(saveDocument.fileName),
    sequence: Number(saveDocument.sequence || 0),
  };
};

export { mapSaveDocumentApiToEntity, mapSaveDocumentEntityToApi };
