import { ISelectOption } from "@design/input/Select/types";
import { IPeriodicity } from "src/model/entity/periodicity";
import { IDestinationProduct } from "../DestinationForm/types";

interface ICreditConditionsEntry {
  destination?: ISelectOption;
  product: IDestinationProduct;
  simulationWithQuota: boolean;
  amount?: number;
  deadline?: number;
  quota?: number;
  anticipatedInterest: number;
  discounts: number;
  charges: number;
  minWarrantyRequired: string;
  netValue: number;
  rate: number;
  hasResult: boolean;
  paymentMethod?: ISelectOption;
  paymentMethods: ISelectOption[];
  periodicity: IPeriodicity;
  periodicities: IPeriodicity[];
  transferBankEntityCode?: string;
  transferBankEntityName?: string;
  transferAccountType?: string;
  transferAccountNumber?: string;
}

export type { ICreditConditionsEntry };
