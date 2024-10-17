import { RequestType } from "src/model/entity/request";
import { IValidation } from "src/model/entity/service";
import { IBeneficiary } from "src/model/entity/user";

interface IRequirementRequest {
  requestType: RequestType;
  customerCode: string;
  customerName: string;
  requestDate: Date;
  requestData: {
    // Credits, Aids
    productId: string;
    productName: string;
    amount: number;

    // Credits
    destinationId?: string;
    destinationName?: string;
    paymentMethod?: string;
    paymentMethodName?: string;
    deadline?: number;
    rate?: number;
    amortizationType?: string;
    interestPaymentPeriod?: string;
    periodicity?: string;
    quota?: number;
    netValue?: number;

    // Credits, Aids
    disbursmentMethod?: {
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

    // Aids
    beneficiary?: IBeneficiary;
  };
}

interface IRequirementResponse {
  validations: IValidation[];
  documents: IValidation[];
}

export type { IRequirementRequest, IRequirementResponse };
