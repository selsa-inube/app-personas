import { FormikProps } from "formik";
import { IConditionsEntry } from "./forms/ConditionsForm/types";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { IInvestmentNameEntry } from "./forms/InvestmentNameForm/types";
import { IRefundEntry } from "./forms/RefundForm/types";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";

interface IFormsCdatRequest {
  investment: { isValid: boolean; values: IInvestmentEntry };
  conditions: { isValid: boolean; values: IConditionsEntry };
  refund: { isValid: boolean; values: IRefundEntry };
  investmentName: { isValid: boolean; values: IInvestmentNameEntry };
  contactChannels: {
    isValid: boolean;
    values: IContactChannelsEntry;
  };
}

interface IFormsCdatRequestRefs {
  investment: React.RefObject<FormikProps<IInvestmentEntry>>;
  conditions: React.RefObject<FormikProps<IConditionsEntry>>;
  refund: React.RefObject<FormikProps<IRefundEntry>>;
  investmentName: React.RefObject<FormikProps<IInvestmentNameEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
}

export type { IFormsCdatRequest, IFormsCdatRequestRefs };
