import { IPlanNameEntry } from "../forms/PlanNameForm/types";
import { ISavingConditionsEntry } from "../forms/SavingConditionsForm/types";

const savingConditions: ISavingConditionsEntry = {
  product: {
    id: "",
    title: "",
    description: "",
    maxRate: 0,
    maxDeadline: 0,
    maxAmount: 0,
    maxAmountForUser: 0,
    amortizationType: "",
  },
  simulationWithQuota: false,
  netValue: 0,
  anticipatedInterest: 0,
  discounts: 0,
  rate: 0,
  hasResult: false,
  minWarrantyRequired: "",
  paymentMethods: [],
  periodicity: {
    id: "",
    description: "",
    periodicityInMonths: 0,
    periodicityInDays: 0,
  },
  periodicities: [],
  charges: 0,
};

const planName: IPlanNameEntry = {
  productName: "",
};

const initalValuesProgrammedSavingFixed = {
  savingConditions,
  planName,
};

export { initalValuesProgrammedSavingFixed };
