import { IValidation } from "src/model/entity/service";

interface IRequestCdatRequest {
  customerCode: string;
  customerName: string;
  requestedAmount: number;
  termInDays: number;
  interestRate: number;
  actionAfterExpiration: string;
  termsConditions: {
    ids: string;
    description: string;
  };
  comments: string;
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
  paymentMethod: {
    paymentType: string;
    accountNumber: string;
    descriptionPayment: string;
    value: number;
    urlRedirect: string;
  };
}

interface IRequestCdatResponse {
  trackingCode: string;
  url?: string;
  state: string;
  message: string;
}

export type { IRequestCdatRequest, IRequestCdatResponse };
