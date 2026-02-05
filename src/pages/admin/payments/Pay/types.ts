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
  obligations: React.RefObject<FormikProps<IObligationsEntry> | null>;
  paymentMethod: React.RefObject<FormikProps<IPaymentMethodEntry> | null>;
  comments: React.RefObject<FormikProps<ICommentsEntry> | null>;
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
  ACCOUNTSRECEIVABLE = "ACCOUNTSRECEIVABLE",
}

enum EPaymentOptionType {
  EXPIRED_VALUE = "ExpiredValue",
  NEXT_VALUE = "NextValue",
  TOTAL_VALUE = "TotalValue",
  UNSELECT_ALL = "UnselectAll",
  REPROGRAMMING_DEADLINE = "RescheduleKeepingDeadline",
  REPROGRAMMING_MAINTAINING_VALUE = "RescheduleKeepingQuotaValue",
  REDUCE_FUTURE_QUOTA = "EarlyQuotaPayment",
  CAPITAL_REDUCTION = "CapitalReduction",
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
  EPaymentOptionType,
  EPaymentStatusType,
  ESupportDocumentType,
};

export type { IFormsPay, IFormsPayRefs };
