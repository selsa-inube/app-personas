import { IEntryCategory } from "@pages/request/events/RegisterInEvent/forms/ChooseEntriesForm/types";
import { IValidation } from "src/model/entity/service";

interface IMoneySourceValid {
  accountNumber?: string;
  type: string;
  name?: string;
  value: number;
}
interface ISystemValidationsEntry {
  validations: IValidation[];
  documents: IValidation[];
  productId: string;
  productName: string;
  amount: number;

  destinationId?: string;
  destinationName?: string;
  paymentMethod?: string;
  paymentMethodName?: string;
  periodicity?: string;
  deadline?: number;
  rate?: number;
  amortizationType?: string;
  quota?: number;
  netValue?: number;

  productCode?: string;
  eventType?: string;
  totalServiceValue?: number;
  totalSubsidyValue?: number;
  totalValue?: number;
  entriesCategories?: IEntryCategory[];
}

export type { IMoneySourceValid, ISystemValidationsEntry };
