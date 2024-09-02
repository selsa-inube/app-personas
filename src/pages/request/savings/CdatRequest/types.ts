import { FormikProps } from "formik";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { IConditionsEntry } from "./forms/ConditionsForm/types";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { IInvestmentNameEntry } from "./forms/InvestmentNameForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";
import { IRefundEntry } from "./forms/RefundForm/types";
import { ITermsAndConditionsEntry } from "./forms/TermsAndConditionsForm/types";

interface IFormsCdatRequest {
  investment: { isValid: boolean; values: IInvestmentEntry };
  conditions: { isValid: boolean; values: IConditionsEntry };
  paymentMethod: { isValid: boolean; values: IPaymentMethodEntry };
  refund: { isValid: boolean; values: IRefundEntry };
  investmentName: { isValid: boolean; values: IInvestmentNameEntry };
  contactChannels: {
    isValid: boolean;
    values: IContactChannelsEntry;
  };
  comments: { isValid: boolean; values: ICommentsEntry };
  termsAndConditions: { isValid: boolean; values: ITermsAndConditionsEntry };
}

interface IFormsCdatRequestRefs {
  investment: React.RefObject<FormikProps<IInvestmentEntry>>;
  conditions: React.RefObject<FormikProps<IConditionsEntry>>;
  paymentMethod: React.RefObject<FormikProps<IPaymentMethodEntry>>;
  refund: React.RefObject<FormikProps<IRefundEntry>>;
  investmentName: React.RefObject<FormikProps<IInvestmentNameEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry>>;
}

export type { IFormsCdatRequest, IFormsCdatRequestRefs };
