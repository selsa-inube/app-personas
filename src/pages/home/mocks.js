const savingsProducts = [
  {
    title: "Cuenta de ahorros",
    id: "09-786238-77",
    attributes: [
      {
        label: "Saldo total",
        value: "$1.225.000",
      },
    ],
  },
  {
    title: "Cuenta de ahorros",
    id: "82-786238-55",
    attributes: [
      {
        label: "Saldo total",
        value: "$19.100.000",
      },
    ],
  },
];

const creditProducts = [
  {
    title: "Crédito educativo",
    id: "C2786238-55",
    attributes: [
      {
        label: "Valor próximo pago",
        value: "$500.000",
      },
      {
        label: "Fecha próximo pago",
        value: "02/ABR/2023",
      },
      {
        label: "Saldo total",
        value: "$1.225.000",
      },
    ],
  },
  {
    title: "Crédito libre inversión",
    id: "C9786288-14",
    attributes: [
      {
        label: "Valor próximo pago",
        value: "$1.100.000",
      },
      {
        label: "Fecha próximo pago",
        value: "02/MAY/2023",
      },
      {
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

const cardProducts = [];

export { savingsProducts, creditProducts, cardProducts };
