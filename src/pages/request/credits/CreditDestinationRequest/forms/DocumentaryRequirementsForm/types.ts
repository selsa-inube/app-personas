import { ISelectedDocument, IValidation } from "src/model/entity/service";

interface IDocumentaryRequirementsEntry {
  requiredDocuments: IValidation[];
  selectedDocuments: ISelectedDocument[];
  withDocumentaryRequirements: boolean;
}

export type { IDocumentaryRequirementsEntry };
