import { beneficiariesMock } from "@mocks/users/users.mocks";
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
    applicationValue: 0,
  };
};

const mapDetailsSituation = (): IDetailsSituationEntry => {
  return {
    message: "",
  };
};

const mapRegulationValidations = (): IRegulationValidationsEntry => {
  return {
    id: "",
  };
};

const mapDocumentaryRequirements = (): IDocumentaryRequirementsEntry => {
  return {
    id: "",
  };
};

const mapDisbursement = (): IDisbursementEntry => {
  return {
    id: "",
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
