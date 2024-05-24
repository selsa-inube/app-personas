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
  CREDITS = "BRIEFCASE",
  SAVINGSCOMMITMENT = "SAVINGSCOMMITMENT",
  CREDITQUOTAS = "CARD",
  INSURANCES = "INSURANCES",
  ACCOUNTSPAYABLE = "ACCOUNTSPAYABLE",
}

enum EPaymentOptionType {
  EXPIREDVALUE = "EXPIREDVALUE",
  NEXTVALUE = "NEXTVALUE",
  TOTALVALUE = "TOTALVALUE",
  OTHERVALUE = "OTHERVALUE",
  UNSELECTALL = "UNSELECTALL",
  REPROGRAMMINGDEADLINE = "RMP",
  REPROGRAMMINGMAINTAININGVALUE = "RMC",
  REDUCEFUTUREQUOTA = "ACF",
}

enum EPaymentMethodType {
  PSE = "PSE",
  DEBIT = "DEBITSAVINGACCOUNT",
  MULTIPLE = "MULTIPLE",
}

enum ESupportDocumentType {
  FINANCIALPORTFOLIO = "OB",
  CONTRIBUTIONCOMMITMENT = "AP",
  SAVINGCOMMITMENT = "AH",
  INSURANCES = "OS",
  MEMBERSHIPFEE = "CF",
  ACCOUNTSRECEIVABLE = "CC",
  ACCOUNTSPAYABLE = "CP",
}

export {
  EPaymentGroupType,
  EPaymentMethodFilterType,
  EPaymentMethodType,
  EPaymentOptionType,
  EPaymentStatusType,
  ESupportDocumentType,
};

export type { IFormsPay, IFormsPayRefs };
