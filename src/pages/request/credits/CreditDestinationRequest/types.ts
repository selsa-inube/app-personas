import { FormikProps } from "formik";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { IDisbursementEntry } from "../../../../shared/forms/DisbursementForm/types";
import { ICreditConditionsEntry } from "./forms/CreditConditionsForm/types";
import { IDestinationEntry } from "./forms/DestinationForm/types";
import { IDocumentaryRequirementsEntry } from "./forms/DocumentaryRequirementsForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";
import { ISystemValidationsEntry } from "./forms/SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "./forms/TermsAndConditionsForm/types";

interface IFormsCreditDestinationRequest {
  destination: { isValid: boolean; values: IDestinationEntry };
  creditConditions: { isValid: boolean; values: ICreditConditionsEntry };
  paymentMethod: { isValid: boolean; values: IPaymentMethodEntry };
  disbursement: { isValid: boolean; values: IDisbursementEntry };
  systemValidations: { isValid: boolean; values: ISystemValidationsEntry };
  documentaryRequirements: {
    isValid: boolean;
    values: IDocumentaryRequirementsEntry;
  };
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
  disbursement: React.RefObject<FormikProps<IDisbursementEntry>>;
  systemValidations: React.RefObject<FormikProps<ISystemValidationsEntry>>;
  documentaryRequirements: React.RefObject<
    FormikProps<IDocumentaryRequirementsEntry>
  >;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry>>;
  contactChannels: React.RefObject<FormikProps<IContactChannelsEntry>>;
}

export type {
  IFormsCreditDestinationRequest,
  IFormsCreditDestinationRequestRefs,
};
