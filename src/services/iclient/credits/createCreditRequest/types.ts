import { ISelectedDocument, IValidation } from "src/model/entity/service";

interface IRequestCreditRequest {
  customerCode: string;
  termsConditions: {
    ids: string;
    description: string;
  };
  comments: string;
  conditions: {
    paymentMethod: string;
    paymentMethodName: string;
    periodicityInMonths: string;
    disbursement: {
      charges: number;
      discounts: number;
      anticipatedInterest: number;
      netValue: number;
    };
    quota: number;
    deadline: number;
    rate: number;
    amount: number;
  };
  destination: string;
  destinationName: string;
  disbursmentMethod: {
    id: string;
    name: string;
    accountNumber?: string;
    transferAccountType?: string;
    transferBankEntity?: string;
    transferAccountNumber?: string;
    businessName?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    genderName?: string;
    identificationType?: string;
    identification?: string;
  };
  documentaryRequirements: ISelectedDocument[];
  product: string;
  productName: string;
  validations: IValidation[];
}

interface IRequestCreditResponse {
  cus: string;
  destination: string;
  productRequestId: string;
  requestDate: Date;
  status: string;
}

export type { IRequestCreditRequest, IRequestCreditResponse };
