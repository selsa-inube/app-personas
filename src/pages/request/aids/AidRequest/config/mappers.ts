import { beneficiariesMock } from "@mocks/users/users.mocks";
import { IBeneficiariesEntry } from "../forms/BeneficiariesForm/types";
import { IDetailsSituationEntry } from "../forms/DetailsSituationForm/types";

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

export { mapBeneficiaries, mapDetailsSituation };
