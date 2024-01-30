import { ICommitment } from "src/model/entity/product";

const investmentsCommitmentsMock: ICommitment[] = [
  {
    id: "2 - 23110125",
    title: "Ahorro programado",
    description: "Compromiso de inversión",
    type: "AP",
    attributes: [
      {
        id: "next_pay_date",
        label: "Fecha de pago",
        value: "23/Sep/2023",
      },
      {
        id: "value_to_pay",
        label: "Valor próximo pago",
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
