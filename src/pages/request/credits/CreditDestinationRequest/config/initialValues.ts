import { IDestinationEntry } from "../forms/DestinationForm/types";
import { ISimulateCreditEntry } from "../forms/SimulateCreditForm/types";

const destination: IDestinationEntry = {
  products: [],
  destinations: [],
};

const simulateCredit: ISimulateCreditEntry = {
  product: {
    id: "",
    title: "",
    description: "",
    maxRate: 0,
    maxDeadline: 0,
    maxAmount: 0,
    minAmount: 0,
    maxAmountForUser: 0,
    amortizationType: "",
  },
  simulationWithQuota: false,
  netValue: 0,
  anticipatedInterest: 0,
  discounts: [],
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
  charges: [],
  extraordinaryQuotas: {
    isAvailable: false,
    percentageExtraPayment: 0,
    maxQuotas: 0,
    maxValuePerQuota: 0,
    quotas: 0,
    valuePerQuota: 0,
  },
};

const initialValuesCreditDestination = {
  destination,
  simulateCredit,
};

export { initialValuesCreditDestination };
