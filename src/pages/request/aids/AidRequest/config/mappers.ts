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
    validations: [
      {
        id: "1",
        label: "Validación 1",
        value: "pending",
        failDetails: "Detalle de la validación 1",
      },
      {
        id: "2",
        label: "Validación 2",
        value: "pending",
        isRequired: true,
        failDetails: "Detalle de la validación 2",
      },
    ],
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
