import { IOption } from "@inubekit/inubekit";
import { IPeriodicity } from "src/model/entity/periodicity";
import { ICreditDestinationProduct } from "../DestinationForm/types";

enum ESimulationStep {
  VALUES = 1,
  EXTRAORDINARY_QUOTAS = 2,
  RESULTS = 3,
}

interface IExtraordinaryQuota {
  quantity: number;
  valuePerQuota: number;
  maxQuantity: number;
  maxValuePerQuota: number;
  isAvailable: boolean;
}

interface ISimulateCreditEntry {
  destination?: IOption;
  product: ICreditDestinationProduct;
  simulationWithQuota: boolean;
  amount?: number;
  deadline?: number;
  quota?: number;
  anticipatedInterest: number;
  discounts: { name: string; value: number }[];
  charges: { name: string; value: number }[];
  minWarrantyRequired: string;
  netValue: number;
  rate: number;
  hasResult: boolean;
  paymentMethod?: IOption;
  paymentMethods: IOption[];
  periodicity: IPeriodicity;
  periodicities: IPeriodicity[];
  transferBankEntityCode?: string;
  transferBankEntityName?: string;
  transferAccountType?: string;
  transferAccountNumber?: number;
  currentStep: ESimulationStep;
  extraordinaryQuotas: IExtraordinaryQuota;
}

export type { ISimulateCreditEntry, IExtraordinaryQuota };
export { ESimulationStep };
