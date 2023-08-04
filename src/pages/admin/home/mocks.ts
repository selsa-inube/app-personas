import { IProduct } from "@ptypes/pages/product.types";

const savingsProducts: IProduct[] = [
  {
    title: "Cuenta de ahorros",
    id: "09-786238-77",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: "$1.225.000",
      },
    ],
    tags: [],
  },
  {
    title: "Cuenta de ahorros",
    id: "82-786238-55",
    attributes: [
      {
        id: "net_value",
        label: "Saldo total",
        value: "$19.100.000",
      },
    ],
    tags: [],
  },
];

const creditProducts: IProduct[] = [
  {
    title: "Educativo",
    id: "C2786238-55",
    attributes: [
      {
        id: "next_payment_value",
        label: "Próximo pago",
        value: "$500.000",
      },
      {
        id: "next_payment_date",
        label: "Próxima fecha",
        value: "02/ABR/2023",
      },
      {
        id: "net_value",
        label: "Saldo total",
        value: "$1.225.000",
      },
    ],
    tags: [],
  },
  {
    title: "Libre inversión",
    id: "C9786288-14",
    attributes: [
      {
        id: "next_payment_value",
        label: "Próximo pago",
        value: "$1.100.000",
      },
      {
        id: "next_payment_date",
        label: "Próxima fecha",
        value: "02/MAY/2023",
      },
      {
        id: "net_value",
        label: "Saldo total",
        value: "$18.100.000",
      },
    ],
    tags: [
      {
        label: "En mora",
        appearance: "error",
      },
    ],
  },
];

const cardProducts: IProduct[] = [];

export { cardProducts, creditProducts, savingsProducts };
