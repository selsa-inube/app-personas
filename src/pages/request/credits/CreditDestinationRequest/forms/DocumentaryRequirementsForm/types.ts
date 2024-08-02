import { IValidation } from "src/model/entity/service";

interface ISelectedDocument {
  file: File;
  id: string;
}

interface IDocumentaryRequirementsEntry {
  requiredDocuments: IValidation[];
  selectedDocuments: ISelectedDocument[];
  withDocumentaryRequirements: boolean;
}

export type { IDocumentaryRequirementsEntry, ISelectedDocument };
