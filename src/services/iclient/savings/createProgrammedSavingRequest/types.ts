import { IValidation } from "src/model/entity/service";

interface IRequestProgrammedSavingRequest {
  customerCode: string;
  customerName: string;
  termsConditions: {
    ids: string;
    description: string;
  };
  comments: string;
  conditions: {
    shareMaturity: string;
    deadline: number;
    paymentMethod: string;
    paymentMethodName: string;
    periodicity: string;
    quota: number;
    wayToPay: string;
  };
  disbursmentMethod: {
    id: string;
    name: string;
    accountNumber?: string;
    transferAccountType?: string;
    transferBankEntity?: string;
    transferAccountNumber?: string;
    businessName?: string;
    firstName?: string;
    secondName?: string;
    firstLastName?: string;
    secondLastName?: string;
    gender?: string;
    genderName?: string;
    identificationType?: string;
    identification?: string;
  };
  product: string;
  productName: string;
  validations: IValidation[];
}

interface IRequestProgrammedSavingResponse {
  cus: string;
  destination: string;
  productRequestId: string;
  requestDate: Date;
  status: string;
}

export type {
  IRequestProgrammedSavingRequest,
  IRequestProgrammedSavingResponse,
};
