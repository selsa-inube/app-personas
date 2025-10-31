import { IBeneficiariesEntry } from "../forms/BeneficiariesForm/types";
import { IDetailsSituationEntry } from "../forms/DetailsSituationForm/types";
import { IEvaluateAmountsEntry } from "../forms/EvaluateAmountsForm/types";

const mapBeneficiaries = (): IBeneficiariesEntry => {
  return {
    beneficiaries: [],
  };
};

const mapDetailsSituation = (): IDetailsSituationEntry => {
  return {
    message: "",
    aidId: "",
    aidName: "",
    aidType: {
      id: "",
      value: "",
    },
  };
};

const mapEvaluateAmounts = (): IEvaluateAmountsEntry => {
  return {
    aidCost: 0,
    aidDays: 0,
    aidLimit: 0,
    hasUtilization: false,
    utilizationLimit: 0,
    remainingQuota: 0,
    calculatedAidValue: 0,
    aidId: "",
    aidName: "",
    aidType: {
      id: "",
      value: "",
    }
  };
}

export { mapBeneficiaries, mapDetailsSituation, mapEvaluateAmounts };
