import { ISelectOption } from "@design/input/Select/types";
import { EPaymentMethodType } from "src/model/entity/payment";

const paymentMethods: ISelectOption[] = [
  {
    id: EPaymentMethodType.PSE,
    value: "Pagar con PSE",
  },
  {
    id: EPaymentMethodType.DEBIT,
    value: "Débito automático",
  },
];

export { paymentMethods };
