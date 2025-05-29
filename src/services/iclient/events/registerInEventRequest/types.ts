import { IEntryCategory } from "@pages/request/events/RegisterInEvent/forms/ChooseEntriesForm/types";
import { IEvent } from "src/model/entity/event";
import { IValidation } from "src/model/entity/service";

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
  termsConditions: {
    ids: string;
    description: string;
  };
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
