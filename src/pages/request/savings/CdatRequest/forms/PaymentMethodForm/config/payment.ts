import { IOption } from "@inubekit/inubekit";
import { EPaymentMethodType } from "src/model/entity/payment";

const paymentMethods: IOption[] = [
  {
    id: EPaymentMethodType.PSE,
    value: EPaymentMethodType.PSE,
    label: "Pagar con PSE",
  },
  {
    id: EPaymentMethodType.DEBIT,
    value: EPaymentMethodType.DEBIT,
    label: "Débito automático",
  },
];

export { paymentMethods };
