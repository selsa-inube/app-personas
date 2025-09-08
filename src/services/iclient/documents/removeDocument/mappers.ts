import { IRemoveDocumentRequest } from "./types";

const mapRemoveDocumentEntityToApi = (
  removeDocument: IRemoveDocumentRequest,
) => {
  return {
    documentType: removeDocument.documentType,
    sequence: removeDocument.sequence.toString(),
  };
};

export { mapRemoveDocumentEntityToApi };
