import { IValidation } from "src/model/entity/service";

interface IDocumentaryRequirementsEntry {
  requiredDocuments: IValidation[];
  selectedDocuments: File[];
  withDocumentaryRequirements: boolean;
}

export type { IDocumentaryRequirementsEntry };
