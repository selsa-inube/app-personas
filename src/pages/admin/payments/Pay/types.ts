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

enum EPaymentStatusType {
  ANYWHERE = "ANYWHERE",
  ARREARS = "ARREARS",
}

enum EPaymentMethodFilterType {
  ALL = "ALL",
}

enum EPaymentGroupType {
  ALL = "ALL",
  CREDITS = "CREDITS",
  SAVINGS = "SAVINGS",
  CREDITQUOTAS = "CREDITQUOTAS",
  INSURANCES = "INSURANCES",
  ACCOUNTSPAYABLE = "ACCOUNTSPAYABLE",
}

enum EPaymentOptionType {
  EXPIREDVALUE = "EXPIREDVALUE",
  NEXTVALUE = "NEXTVALUE",
  TOTALVALUE = "TOTALVALUE",
  OTHERVALUE = "OTHERVALUE",
  UNSELECTALL = "UNSELECTALL",
}

enum EPaymentMethodType {
  PSE = "PSE",
  DEBIT = "DEBIT",
  MULTIPLE = "MULTIPLE",
}

export {
  EPaymentGroupType,
  EPaymentMethodFilterType,
  EPaymentMethodType,
  EPaymentOptionType,
  EPaymentStatusType,
};

export type { IFormsPay, IFormsPayRefs };
