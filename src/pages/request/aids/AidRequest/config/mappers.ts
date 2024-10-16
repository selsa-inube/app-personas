import { IBeneficiariesEntry } from "../forms/BeneficiariesForm/types";
import { IDetailsSituationEntry } from "../forms/DetailsSituationForm/types";

const mapBeneficiaries = (): IBeneficiariesEntry => {
  return {
    beneficiaries: [],
  };
};

const mapDetailsSituation = (): IDetailsSituationEntry => {
  return {
    message: "",
    quotaAvailable: 2500000,
    daysAvailable: 30,
  };
};

export { mapBeneficiaries, mapDetailsSituation };
