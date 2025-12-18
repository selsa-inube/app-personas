import { IActionExpirationEntry } from "@forms/ActionExpirationForm/types";
import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { IPaymentMethodEntry } from "@forms/PaymentMethodForm/types";
import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { FormikProps } from "formik";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { ISavingConditionsEntry } from "./forms/SavingConditionsForm/types";

interface IFormsProgrammedSavingRequest {
  destination: { isValid: boolean; values: IDestinationEntry };
  savingConditions: { isValid: boolean; values: ISavingConditionsEntry };
  paymentMethod: { isValid: boolean; values: IPaymentMethodEntry };
  actionExpiration: { isValid: boolean; values: IActionExpirationEntry };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
  systemValidations: { isValid: boolean; values: ISystemValidationsEntry };
  termsAndConditions: { isValid: boolean; values: ITermsAndConditionsEntry };
  contactChannels: { isValid: boolean; values: IContactChannelsEntry };
}

interface IFormsProgrammedSavingRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry> | null>;
  savingConditions: React.RefObject<FormikProps<ISavingConditionsEntry> | null>;
  paymentMethod: React.RefObject<FormikProps<IPaymentMethodEntry> | null>;
  actionExpiration: React.RefObject<FormikProps<IActionExpirationEntry> | null>;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry> | null>;
  systemValidations: React.RefObject<FormikProps<ISystemValidationsEntry> | null>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry> | null>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry> | null>;
}

export type {
  IFormsProgrammedSavingRequest,
  IFormsProgrammedSavingRequestRefs,
};
