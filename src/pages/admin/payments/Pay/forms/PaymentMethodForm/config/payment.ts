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
    label: "Pagar con débito a una cuenta de ahorros",
  },
  {
    id: EPaymentMethodType.MULTIPLE,
    value: EPaymentMethodType.MULTIPLE,
    label: "Pagar con múltiples fuentes de dinero",
  },
];

const getPaymentMethods = (
  withPSE: boolean,
  withDebit: boolean,
  withMultiple: boolean,
): IOption[] => {
  const options: IOption[] = [];
  if (withPSE) {
    options.push({
      id: EPaymentMethodType.PSE,
      value: EPaymentMethodType.PSE,
      label: "Pagar con PSE",
    });
  }
  if (withDebit) {
    options.push({
      id: EPaymentMethodType.DEBIT,
      value: EPaymentMethodType.DEBIT,
      label: "Pagar con débito a una cuenta de ahorros",
    });
  }
  if (withMultiple) {
    options.push({
      id: EPaymentMethodType.MULTIPLE,
      value: EPaymentMethodType.MULTIPLE,
      label: "Pagar con múltiples fuentes de dinero",
    });
  }
  return options;
};

export { getPaymentMethods, paymentMethods };
