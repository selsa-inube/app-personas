import { ISelectOption } from "@design/input/Select/types";
import { IDestinationProduct } from "@pages/request/credits/CreditDestinationRequest/forms/DestinationForm/types";
import { IPeriodicity } from "src/model/entity/periodicity";

interface ISavingConditionsEntry {
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
  transferBankEntity?: string;
  transferAccountType?: string;
  transferAccountNumber?: string;
}

export type { ISavingConditionsEntry };
