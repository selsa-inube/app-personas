import { IPayment } from "src/model/entity/payment";
import { IObligationsEntry } from "../forms/ObligationsForm/types";
import { IPaymentMethodEntry } from "../forms/PaymentMethodForm/types";
import { EPaymentOptionType } from "../types";

const paymentOptionValues: Record<string, string> = {
  [EPaymentOptionType.EXPIRED_VALUE]: "Valor vencido",
  [EPaymentOptionType.NEXT_VALUE]: "Próximo vencimiento",
  [EPaymentOptionType.TOTAL_VALUE]: "Pago total",
  [EPaymentOptionType.REPROGRAMMING_DEADLINE]: "Reducir cuota",
  [EPaymentOptionType.REPROGRAMMING_MAINTAINING_VALUE]: "Reducir plazo",
  [EPaymentOptionType.REDUCE_FUTURE_QUOTA]: "Pagar cuotas futuras",
  [EPaymentOptionType.CAPITAL_REDUCTION]: "Abono a capital",
};

const mapObligations = (
  credits: IPayment[],
  commitments: IPayment[],
  cards: IPayment[],
  accounts: IPayment[],
): IObligationsEntry => {
  const payments: IPayment[] = [];
  const paymentMethodFilters: string[] = [];

  [...credits, ...commitments, ...cards, ...accounts].forEach((payment) => {
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

export { mapObligations, mapPaymentMethod, paymentOptionValues };
