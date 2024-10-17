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
    quotaAvailable: 0,
    daysAvailable: 0,
  };
};

export { mapBeneficiaries, mapDetailsSituation };
