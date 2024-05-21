import { IValidation } from "src/model/entity/service";

interface IDocumentaryRequirementsEntry {
  requiredDocuments: IValidation[];
  selectedDocuments: File[];
}

export type { IDocumentaryRequirementsEntry };
