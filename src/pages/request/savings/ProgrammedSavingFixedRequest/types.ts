import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { IPaymentMethodEntry } from "@forms/PaymentMethodForm/types";
import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { FormikProps } from "formik";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { ISavingConditionsEntry } from "./forms/SavingConditionsForm/types";
import { IShareMaturityEntry } from "./forms/ShareMaturityForm/types";

interface IFormsProgrammedSavingFixedRequest {
  destination: { isValid: boolean; values: IDestinationEntry };
  savingConditions: { isValid: boolean; values: ISavingConditionsEntry };
  paymentMethod: { isValid: boolean; values: IPaymentMethodEntry };
  shareMaturity: { isValid: boolean; values: IShareMaturityEntry };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
  systemValidations: { isValid: boolean; values: ISystemValidationsEntry };
  termsAndConditions: { isValid: boolean; values: ITermsAndConditionsEntry };
  contactChannels: { isValid: boolean; values: IContactChannelsEntry };
}

interface IFormsProgrammedSavingFixedRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry>>;
  savingConditions: React.RefObject<FormikProps<ISavingConditionsEntry>>;
  paymentMethod: React.RefObject<FormikProps<IPaymentMethodEntry>>;
  shareMaturity: React.RefObject<FormikProps<IShareMaturityEntry>>;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry>>;
  systemValidations: React.RefObject<FormikProps<ISystemValidationsEntry>>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
}

export type {
  IFormsProgrammedSavingFixedRequest,
  IFormsProgrammedSavingFixedRequestRefs,
};
