import { FormikProps } from "formik";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { ICreditConditionsEntry } from "./forms/CreditConditionsForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { IDisbursementEntry } from "./forms/DisbursementForm/types";
import { IDocumentaryRequirementsEntry } from "./forms/DocumentaryRequirementsForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";
import { ISystemValidationsEntry } from "./forms/SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "./forms/TermsAndConditionsForm/types";

interface IFormsCreditDestinationRequest {
  destination: { isValid: boolean; values: IDestinationEntry };
  creditConditions: { isValid: boolean; values: ICreditConditionsEntry };
  paymentMethod: { isValid: boolean; values: IPaymentMethodEntry };
  systemValidations: { isValid: boolean; values: ISystemValidationsEntry };
  documentaryRequirements: {
    isValid: boolean;
    values: IDocumentaryRequirementsEntry;
  };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
  comments: { isValid: boolean; values: ICommentsEntry };
  termsAndConditions: { isValid: boolean; values: ITermsAndConditionsEntry };
  contactChannels: {
    isValid: boolean;
    values: IContactChannelsEntry;
  };
}

interface IFormsCreditDestinationRequestRefs {
  destination: React.RefObject<FormikProps<IDestinationEntry>>;
  creditConditions: React.RefObject<FormikProps<ICreditConditionsEntry>>;
  paymentMethod: React.RefObject<FormikProps<IPaymentMethodEntry>>;
  systemValidations: React.RefObject<FormikProps<ISystemValidationsEntry>>;
  documentaryRequirements: React.RefObject<
    FormikProps<IDocumentaryRequirementsEntry>
  >;
  disbursement: React.RefObject<FormikProps<IDisbursementEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
}

export type {
  IFormsCreditDestinationRequest,
  IFormsCreditDestinationRequestRefs,
};
