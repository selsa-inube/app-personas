import { IPayment } from "src/model/entity/payment";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IObligationsEntry } from "../forms/ObligationsForm/types";
import { IPaymentMethodEntry } from "../forms/PaymentMethodForm/types";

const buAllowCustomValue = true;

const mapObligations = (payments: IPayment[]): IObligationsEntry => {
  return {
    payments: payments,
    allowCustomValue: buAllowCustomValue,
    totalPayment: 0,
  };
};

const mapPaymentMethod = (): IPaymentMethodEntry => {
  return {
    paymentMethod: "",
    valueToPay: 0,
    paidValue: 0,
    pendingValue: 0,
  };
};

const mapComments = (): ICommentsEntry => {
  return {
    comments: "",
  };
};

export { mapComments, mapObligations, mapPaymentMethod };
