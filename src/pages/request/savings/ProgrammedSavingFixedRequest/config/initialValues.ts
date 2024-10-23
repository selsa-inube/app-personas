import { IDestinationEntry } from "../forms/DestinationForm/types";
import { IPlanNameEntry } from "../forms/PlanNameForm/types";
import { ISavingConditionsEntry } from "../forms/SavingConditionsForm/types";
import { IShareMaturityEntry } from "../forms/ShareMaturityForm/types";

const destination: IDestinationEntry = {
  products: [],
};

const savingConditions: ISavingConditionsEntry = {
  netValue: 0,
  annualRate: 0,
  hasResult: false,
  gmf: 0,
  savingAmount: 0,
  withholdingTax: 0,
  yields: 0,
  paymentMethods: [],
  periodicity: {
    id: "",
    description: "",
    periodicityInMonths: 0,
    periodicityInDays: 0,
  },
  periodicities: [],
};

const planName: IPlanNameEntry = {
  productName: "",
};

const shareMaturity: IShareMaturityEntry = {};

const initalValuesProgrammedSavingFixed = {
  destination,
  savingConditions,
  planName,
  shareMaturity,
};

export { initalValuesProgrammedSavingFixed };
