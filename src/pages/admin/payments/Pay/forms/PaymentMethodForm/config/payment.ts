import { ISelectOption } from "@design/input/Select/types";

const paymentMethods: ISelectOption[] = [
  {
    id: "pse",
    value: "Pagar con PSE",
  },
  {
    id: "debit",
    value: "Pagar con débito a una cuenta de ahorros",
  },
  {
    id: "multiple",
    value: "Pagar con múltiples fuentes de dinero",
  },
];

export { paymentMethods };
