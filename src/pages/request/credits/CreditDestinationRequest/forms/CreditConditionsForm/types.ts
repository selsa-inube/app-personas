import { IDestinationProduct } from "../DestinationForm/types";

interface ICreditConditionsEntry {
  creditDestination: string;
  product: IDestinationProduct;
  simulationWithQuota: boolean;
  amount: string;
  peridiocity: string;
  deadline: string;
  quota: number;
  cycleInterest: number;
  netValue: number;
  interestRate: string;
  hasResult: boolean;
}

export type { ICreditConditionsEntry };
