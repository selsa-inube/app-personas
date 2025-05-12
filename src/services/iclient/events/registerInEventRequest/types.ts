import { IEntryCategory } from "@pages/request/events/RegisterInEvent/forms/ChooseEntriesForm/types";
import { IValidation } from "src/model/entity/service";

interface IRegisterInEventRequest {
  customerCode: string;
  eventId: string;
  entries: IEntryCategory[];
  totalValue: number;
  paymentMethod: {
    paymentType: string;
    accountNumber: string;
    descriptionPayment: string;
    value: number;
  },
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
