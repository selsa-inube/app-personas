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

const cardProducts: IProduct[] = [];

export { cardProducts, savingsProducts };
