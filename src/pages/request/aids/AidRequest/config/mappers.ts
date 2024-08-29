import { aidsRequestMock } from "@mocks/services/aids/aidsRequest.mocks";
import { beneficiariesMock } from "@mocks/users/users.mocks";
import { IDomainType } from "@ptypes/domain.types";
import { IValidation } from "src/model/entity/service";
import { IAmountEntry } from "../forms/AmountForm/types";
import { IBeneficiariesEntry } from "../forms/BeneficiariesForm/types";
import { IDetailsSituationEntry } from "../forms/DetailsSituationForm/types";
import { IDisbursementEntry } from "../forms/DisbursementForm/types";
import { IDocumentaryRequirementsEntry } from "../forms/DocumentaryRequirementsForm/types";
import { IRegulationValidationsEntry } from "../forms/RegulationValidationsForm/types";

const mapBeneficiaries = (): IBeneficiariesEntry => {
  return {
    beneficiaries: beneficiariesMock.map((beneficiary) => ({
      ...beneficiary,
      selected: false,
    })),
  };
};

const mapAmount = (): IAmountEntry => {
  return {
    quotaAvailable: 2500000,
  };
};

const mapDetailsSituation = (): IDetailsSituationEntry => {
  return {
    message: "",
  };
};

const mapRegulationValidations = (
  aidType?: IDomainType,
): IRegulationValidationsEntry => {
  const selectedAid = aidsRequestMock.find((aid) => aid.id === aidType?.id);
  const validations: IValidation[] = [];
  console.log(selectedAid);
  if (selectedAid) {
    selectedAid.validations.regulations.forEach((regulation) => {
      validations.push({
        id: regulation.id,
        label: regulation.label,
        value: "pending",
        isRequired: regulation.isRequired,
        documentType: regulation.documentType,
      });
    });
  }
  return {
    validations,
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
      });
    });
  }

  return {
    requiredDocuments,
    selectedDocuments: [],
  };
};

const mapDisbursement = (): IDisbursementEntry => {
  return {
    accountOptions: [],
    account: "",
    disbursementMethod: "",
    accountDescription: "",
  };
};

export {
  mapAmount,
  mapBeneficiaries,
  mapDetailsSituation,
  mapDisbursement,
  mapDocumentaryRequirements,
  mapRegulationValidations,
};
