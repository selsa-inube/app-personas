import { aidsRequestMock } from "@mocks/services/aids/aidsRequest.mocks";
import { beneficiariesMock } from "@mocks/users/users.mocks";
import { IDomainType } from "@ptypes/domain.types";
import { IValidation } from "src/model/entity/service";
import { IBeneficiariesEntry } from "../forms/BeneficiariesForm/types";
import { IDetailsSituationEntry } from "../forms/DetailsSituationForm/types";
import { IDocumentaryRequirementsEntry } from "../forms/DocumentaryRequirementsForm/types";

const mapBeneficiaries = (): IBeneficiariesEntry => {
  return {
    beneficiaries: beneficiariesMock.map((beneficiary) => ({
      ...beneficiary,
      selected: false,
    })),
  };
};

const mapDetailsSituation = (): IDetailsSituationEntry => {
  return {
    message: "",
    quotaAvailable: 2500000,
    daysAvailable: 30,
  };
};

const mapDocumentaryRequirements = (
  aidType?: IDomainType,
): IDocumentaryRequirementsEntry => {
  const selectedAid = aidsRequestMock.find((aid) => aid.id === aidType?.id);
  const requiredDocuments: IValidation[] = [];

  if (selectedAid) {
    selectedAid.validations.requiredDocuments.forEach((document) => {
      requiredDocuments.push({
        id: document.id,
        label: document.label,
        isRequired: document.isRequired,
        documentType: document.documentType,
      });
    });
  }

  return {
    requiredDocuments,
    selectedDocuments: [],
  };
};

export { mapBeneficiaries, mapDetailsSituation, mapDocumentaryRequirements };
