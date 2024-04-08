import { IPayment } from "src/model/entity/payment";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { paymentInitialFilters } from "../forms/ObligationsForm/config/filters";
import { IObligationsEntry } from "../forms/ObligationsForm/types";
import { IPaymentMethodEntry } from "../forms/PaymentMethodForm/types";

const buAllowCustomValue = true;

const mapObligations = (payments: IPayment[]): IObligationsEntry => {
  return {
    payments: payments,
    allowCustomValue: buAllowCustomValue,
    totalPayment: 0,
    filters: paymentInitialFilters,
  };
};

const mapPaymentMethod = (): IPaymentMethodEntry => {
  return {
    id: "",
  };
};

const mapComments = (): ICommentsEntry => {
  return {
    comments: "",
  };
};

export { mapComments, mapObligations, mapPaymentMethod };
