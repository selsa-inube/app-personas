import { IAmountEntry } from "../forms/AmountForm/types";
import { IBeneficiariesEntry } from "../forms/BeneficiariesForm/types";
import { IDetailsSituationEntry } from "../forms/DetailsSituationForm/types";
import { IDisbursementEntry } from "../forms/DisbursementForm/types";
import { IDocumentaryRequirementsEntry } from "../forms/DocumentaryRequirementsForm/types";
import { IRegulationValidationsEntry } from "../forms/RegulationValidationsForm/types";

const mapBeneficiaries = (): IBeneficiariesEntry => {
  return {
    id: "",
  };
};

const mapAmount = (): IAmountEntry => {
  return {
    id: "",
  };
};

const mapDetailsSituation = (): IDetailsSituationEntry => {
  return {
    id: "",
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
