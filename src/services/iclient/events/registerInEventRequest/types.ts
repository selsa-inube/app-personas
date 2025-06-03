import { IEntryCategory } from "@pages/request/events/RegisterInEvent/forms/ChooseEntriesForm/types";
import { IEvent } from "src/model/entity/event";
import { IValidation } from "src/model/entity/service";
import { IBeneficiary } from "src/model/entity/user";

interface IRegisterInEventRequest {
  customerCode: string;
  event: IEvent;
  entries: IEntryCategory[];
  totalValue: number;
  paymentMethod: {
    paymentType: string;
    accountNumber: string;
    descriptionPayment: string;
    value: number;
  };
  participants?: IBeneficiary[];
  termsConditions: {
    ids: string;
    description: string;
  };
  totalServiceValue?: number;
  totalSubsidyValue?: number;
  validations: IValidation[];
}

interface IRegisterInEventResponse {
  cus: string;
  destination: string;
  productRequestId: string;
  requestDate: Date;
  status: string;
}

export type { IRegisterInEventRequest, IRegisterInEventResponse };
