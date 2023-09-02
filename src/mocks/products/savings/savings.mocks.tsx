import { IProduct } from "@ptypes/pages/product.types";

const savingsMock: IProduct[] = [
  {
    title: "Cuenta familiar",
    id: "CA214554",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: 785923,
      },
      {
        id: "account_type",
        label: "Tipo de cuenta",
        value: "ahorro",
      }
    ],
    tags: [],
  },
  {
    title: "Cuenta de ahorros",
    id: "CA652879",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: 592381,
      },
    ],
    tags: [],
  },
  {
    title: "Aportes sociales",
    id: "AP985647",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: 7642790,
      },
    ],
    tags: [],
  },
  {
    title: "Ahorro permanente",
    id: "AP554896",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: 1980656,
      },
    ],
    tags: [],
  },
];

export { savingsMock };
