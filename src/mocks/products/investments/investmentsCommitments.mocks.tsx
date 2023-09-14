import { ICommitment } from "@ptypes/pages/product.types";

const investmentsCommitmentsMock: ICommitment[] = [
  {
    id: "commitment-1",
    title: "Ahorro programado",
    attributes: [
      {
        id: "next_pay_date",
        label: "Fecha próximo pago",
        value: "23/Sep/2023",
      },
      {
        id: "value_to_pay",
        label: "Valor a pagar",
        value: 150000,
      },
      {
        id: "due_date",
        label: "Fecha vencimiento",
        value: "23/Oct/2023",
      },
      {
        id: "pay_method",
        label: "Medio de pago",
        value: "Grúas de occidente",
      },
      {
        id: "periodicity",
        label: "Periodicidad",
        value: "Mensual",
      },
    ],
    products: ["2-23110125"],
  },
];

export { investmentsCommitmentsMock };
