import { FormikProps } from "formik";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IObligationsEntry } from "./forms/ObligationsForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";

interface IFormsPay {
  obligations: { isValid: boolean; values: IObligationsEntry };
  paymentMethod: { isValid: boolean; values: IPaymentMethodEntry };
  comments: { isValid: boolean; values: ICommentsEntry };
}

interface IFormsPayRefs {
  obligations: React.RefObject<FormikProps<IObligationsEntry>>;
  paymentMethod: React.RefObject<FormikProps<IPaymentMethodEntry>>;
  comments: React.RefObject<FormikProps<ICommentsEntry>>;
}

export type { IFormsPay, IFormsPayRefs };
