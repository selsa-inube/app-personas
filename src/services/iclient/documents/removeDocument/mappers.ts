import { IRemoveDocumentRequest, IRemoveDocumentResponse } from "./types";

const mapRemoveDocumentEntityToApi = (
  removeDocument: IRemoveDocumentRequest,
): FormData => {
  const fd = new FormData();

  fd.append("documentType", removeDocument.documentType);
  fd.append("file", removeDocument.file);

  return fd;
};

const mapRemoveDocumentApiToEntity = (
  removeDocument: Record<string, string | number | object>,
): IRemoveDocumentResponse => {
  return {
    documentType: String(removeDocument.documentType),
    fileName: String(removeDocument.fileName),
    sequence: Number(removeDocument.sequence || 0),
  };
};

export { mapRemoveDocumentApiToEntity, mapRemoveDocumentEntityToApi };
