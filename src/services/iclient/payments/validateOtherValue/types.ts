import { IApplyPayOption } from "@components/modals/payments/CustomValueModal/utils";

interface IOtherValueRequest {
  amount: number;
  obligationNumber: string;
}

interface IOtherValueResponse {
  isValid: boolean;
  options: IApplyPayOption[];
  errorValidation: string;
}

export type { IOtherValueRequest, IOtherValueResponse };
