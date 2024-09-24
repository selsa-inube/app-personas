import { IDocumentaryRequirementsEntry } from "./types";

const mapDocumentaryRequirements = (): IDocumentaryRequirementsEntry => {
  return {
    requiredDocuments: [],
    selectedDocuments: [],
  };
};

export { mapDocumentaryRequirements };
