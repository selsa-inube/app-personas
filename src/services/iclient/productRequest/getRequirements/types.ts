import { IMoneySourceValid } from "@forms/SystemValidationsForm/types";
import { RequestType } from "src/model/entity/request";
import { IValidation } from "src/model/entity/service";
import { IBeneficiary } from "src/model/entity/user";

interface IRequirementDisbursementRequest {
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
}

interface IRequirementCreditData {
  destinationId: string;
  destinationName: string;
  rate: number;
  amortizationType: string;
  interestPaymentPeriod: string;
  netValue: number;
  productId: string;
  productName: string;
  amount: number;
  deadline: number;
  paymentMethod: string;
  paymentMethodName: string;
  periodicity: string;
  quota: number;
}

interface IRequirementAidData {
  productId: string;
  productName: string;
  amount: number;
  beneficiary: IBeneficiary;
}

interface IRequirementProgrammedSavingData {
  actionAfterExpiration: string;
  productId: string;
  productName: string;
  deadline: number;
  paymentMethod: string;
  paymentMethodName: string;
  periodicity: string;
  quota: number;
}

interface IRequirementCdatData {
  productId: string;
  productName: string;
  amount: number;
  deadline: number;
  rate: number;
  moneySources: IMoneySourceValid[];
}

interface IRequirementRequest {
  requestType: RequestType;
  customerCode: string;
  customerName: string;
  requestDate: Date;
  creditData?: IRequirementCreditData;
  aidData?: IRequirementAidData;
  programmedSavingData?: IRequirementProgrammedSavingData;
  cdatData?: IRequirementCdatData;
  disbursementMethod: IRequirementDisbursementRequest;
}

interface IRequirementResponse {
  validations: IValidation[];
  documents: IValidation[];
}

export type {
  IRequirementDisbursementRequest,
  IRequirementRequest,
  IRequirementResponse,
};
