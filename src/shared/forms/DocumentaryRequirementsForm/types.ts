import { ISelectedDocument, IValidation } from "src/model/entity/service";

interface IDocumentaryRequirementsEntry {
  requiredDocuments: IValidation[];
  selectedDocuments: ISelectedDocument[];
}

export type { IDocumentaryRequirementsEntry };
