import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { IPaymentMethodEntry } from "@forms/PaymentMethodForm/types";
import { FormikProps } from "formik";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { ICommentsEntry } from "../../../../shared/forms/CommentsForm/types";
import { IPlanNameEntry } from "./forms/PlanNameForm/types";
import { ISavingConditionsEntry } from "./forms/SavingConditionsForm/types";

interface IFormsProgrammedSavingFixedRequest {
  savingConditions: { isValid: boolean; values: ISavingConditionsEntry };
  paymentMethod: { isValid: boolean; values: IPaymentMethodEntry };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
  planName: { isValid: boolean; values: IPlanNameEntry };
  contactChannels: { isValid: boolean; values: IContactChannelsEntry };
  comments: { isValid: boolean; values: ICommentsEntry };
}

interface IFormsProgrammedSavingFixedRequestRefs {
  savingConditions: React.RefObject<FormikProps<ISavingConditionsEntry>>;
  paymentMethod: React.RefObject<FormikProps<IPaymentMethodEntry>>;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry>>;
  planName: React.RefObject<FormikProps<IPlanNameEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
}

export type {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
};
