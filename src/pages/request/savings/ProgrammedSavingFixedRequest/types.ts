import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { IPaymentMethodEntry } from "@forms/PaymentMethodForm/types";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { FormikProps } from "formik";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { ICommentsEntry } from "../../../../shared/forms/CommentsForm/types";
import { IPlanNameEntry } from "./forms/PlanNameForm/types";
import { ISavingConditionsEntry } from "./forms/SavingConditionsForm/types";
import { IShareMaturityEntry } from "./forms/ShareMaturityForm/types";

interface IFormsProgrammedSavingFixedRequest {
  savingConditions: { isValid: boolean; values: ISavingConditionsEntry };
  paymentMethod: { isValid: boolean; values: IPaymentMethodEntry };
  shareMaturity: { isValid: boolean; values: IShareMaturityEntry };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
  planName: { isValid: boolean; values: IPlanNameEntry };
  comments: { isValid: boolean; values: ICommentsEntry };
  termsAndConditions: { isValid: boolean; values: ITermsAndConditionsEntry };
  contactChannels: { isValid: boolean; values: IContactChannelsEntry };
}

interface IFormsProgrammedSavingFixedRequestRefs {
  savingConditions: React.RefObject<FormikProps<ISavingConditionsEntry>>;
  paymentMethod: React.RefObject<FormikProps<IPaymentMethodEntry>>;
  shareMaturity: React.RefObject<FormikProps<IShareMaturityEntry>>;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry>>;
  planName: React.RefObject<FormikProps<IPlanNameEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
}

export type {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
};
