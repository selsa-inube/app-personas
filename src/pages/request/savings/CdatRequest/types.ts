import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { FormikProps } from "formik";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { IDeadlineEntry } from "./forms/DeadlineForm/types";
import { IInterestPaymentEntry } from "./forms/InterestPaymentForm/types";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";
import { IShareMaturityEntry } from "@forms/ShareMaturityForm/types";

interface IFormsCdatRequest {
  investment: { isValid: boolean; values: IInvestmentEntry };
  deadline: { isValid: boolean; values: IDeadlineEntry };
  interestPayment: { isValid: boolean; values: IInterestPaymentEntry };
  paymentMethod: { isValid: boolean; values: IPaymentMethodEntry };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
  shareMaturity: { isValid: boolean; values: IShareMaturityEntry };
  systemValidations: { isValid: boolean; values: ISystemValidationsEntry };
  termsAndConditions: { isValid: boolean; values: ITermsAndConditionsEntry };
  contactChannels: {
    isValid: boolean;
    values: IContactChannelsEntry;
  };
}

interface IFormsCdatRequestRefs {
  investment: React.RefObject<FormikProps<IInvestmentEntry>>;
  deadline: React.RefObject<FormikProps<IDeadlineEntry>>;
  interestPayment: React.RefObject<FormikProps<IInterestPaymentEntry>>;
  paymentMethod: React.RefObject<FormikProps<IPaymentMethodEntry>>;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry>>;
  shareMaturity: React.RefObject<FormikProps<IShareMaturityEntry>>;
  systemValidations: React.RefObject<FormikProps<ISystemValidationsEntry>>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
}

export type { IFormsCdatRequest, IFormsCdatRequestRefs };
