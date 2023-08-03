import { IProduct } from "src/types/pages/product.types";

const myCreditsMock: IProduct[] = [
  {
    id: "C2786238-55",
    title: "Educativo",
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
    id: "C9786288-14",
    title: "Libre inversión",
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

export { myCreditsMock };
