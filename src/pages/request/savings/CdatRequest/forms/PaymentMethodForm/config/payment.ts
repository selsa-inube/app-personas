import { ISelectOption } from "@design/input/Select/types";
import { EPaymentMethodType } from "src/model/entity/payment";

const paymentMethods: ISelectOption[] = [
  {
    id: EPaymentMethodType.PSE,
    value: "Pagar con PSE",
  },
  {
    id: EPaymentMethodType.DEBIT,
    value: "Pagar con débito a una cuenta de ahorros",
  },
  {
    id: EPaymentMethodType.MULTIPLE,
    value: "Pagar con múltiples fuentes de dinero",
  },
];

export { paymentMethods };
