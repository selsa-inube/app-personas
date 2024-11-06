import { IConditionsEntry } from "../forms/ConditionsForm/types";
import { IPaymentMethodEntry } from "../forms/PaymentMethodForm/types";

const conditions: IConditionsEntry = {
  interestPayment: "",
  simulationWithDate: false,
  deadlineDate: "",
  deadlineDays: "",
  hasResult: false,
};

const paymentMethod: IPaymentMethodEntry = {
  paymentMethod: "",
  valueToPay: 0,
  pendingValue: 0,
};

const initalValuesCDAT = {
  conditions,
  paymentMethod,
};

export { initalValuesCDAT };
