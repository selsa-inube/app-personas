import { ISelectedDocument, IValidation } from "src/model/entity/service";
import { IBeneficiary } from "src/model/entity/user";

interface IRequestAidRequest {
  customerCode: string;
  customerName: string;
  termsConditions: {
    ids: string;
    description: string;
  };
  comments: string;
  amount: number;
  beneficiary?: IBeneficiary;
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
  documentaryRequirements: ISelectedDocument[];
  product: string;
  productName: string;
  validations: IValidation[];
}

interface IRequestAidResponse {
  cus: string;
  destination: string;
  productRequestId: string;
  requestDate: Date;
  status: string;
}

export type { IRequestAidRequest, IRequestAidResponse };
