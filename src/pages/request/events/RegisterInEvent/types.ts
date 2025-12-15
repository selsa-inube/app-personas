import { ISystemValidationsEntry } from "@forms/SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "@forms/TermsAndConditionsForm/types";
import { FormikProps } from "formik";
import { IChooseEntriesEntry } from "./forms/ChooseEntriesForm/types";
import { ILiquidationEntry } from "./forms/LiquidationForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";

interface IFormsRegisterInEvent {
  chooseEntries: { isValid: boolean; values: IChooseEntriesEntry };
  liquidation: { isValid: boolean; values: ILiquidationEntry };
  paymentMethod: { isValid: boolean; values: IPaymentMethodEntry };
  systemValidations: { isValid: boolean; values: ISystemValidationsEntry };
  termsAndConditions: { isValid: boolean; values: ITermsAndConditionsEntry };
}

interface IFormsRegisterInEventRefs {
  chooseEntries: React.RefObject<FormikProps<IChooseEntriesEntry> | null>;
  liquidation: React.RefObject<FormikProps<ILiquidationEntry> | null>;
  paymentMethod: React.RefObject<FormikProps<IPaymentMethodEntry> | null>;
  systemValidations: React.RefObject<FormikProps<ISystemValidationsEntry> | null>;
  termsAndConditions: React.RefObject<FormikProps<ITermsAndConditionsEntry> | null>;
}

export type { IFormsRegisterInEvent, IFormsRegisterInEventRefs };
