import { IPayment } from "src/model/entity/payment";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IObligationsEntry } from "../forms/ObligationsForm/types";
import { IPaymentMethodEntry } from "../forms/PaymentMethodForm/types";
import { EPaymentOptionType } from "../types";

const paymentOptionValues: Record<string, string> = {
  [EPaymentOptionType.EXPIREDVALUE]: "Valor vencido",
  [EPaymentOptionType.NEXTVALUE]: "Próximo vencimiento",
  [EPaymentOptionType.TOTALVALUE]: "Pago total",
  [EPaymentOptionType.OTHERVALUE]: "Abono a capital",
  [EPaymentOptionType.REPROGRAMMINGDEADLINE]: "Reducir cuota",
  [EPaymentOptionType.REPROGRAMMINGMAINTAININGVALUE]: "Reducir plazo",
  [EPaymentOptionType.REDUCEFUTUREQUOTA]: "Pagar cuotas futuras",
};

const mapObligations = (
  credits: IPayment[],
  commitments: IPayment[],
  cards: IPayment[],
): IObligationsEntry => {
  const payments: IPayment[] = [];
  const paymentMethodFilters: string[] = [];

  [...credits, ...commitments, ...cards].forEach((payment) => {
    if (
      !paymentMethodFilters.find(
        (filter) =>
          filter.toLowerCase() === payment.paymentMethodName.toLowerCase(),
      )
    ) {
      paymentMethodFilters.push(payment.paymentMethodName);
    }

    payments.push(payment);
  });

  return {
    payments,
    totalPayment: 0,
    paymentMethodFilters,
  };
};

const mapPaymentMethod = (): IPaymentMethodEntry => {
  return {
    paymentMethod: "",
    valueToPay: 0,
    pendingValue: 0,
  };
};

const mapComments = (): ICommentsEntry => {
  return {
    comments: "",
  };
};

export { mapComments, mapObligations, mapPaymentMethod, paymentOptionValues };
