import { ECommitmentType, ICommitment } from "src/model/entity/product";

const investmentsCommitmentsMock: ICommitment[] = [
  {
    id: "2 - 23110125",
    title: "Ahorro programado",
    description: "Compromiso de inversión",
    type: ECommitmentType.SAVINGSPROGRAMMED,
    attributes: [
      {
        id: "next_payment_date",
        label: "Fecha de pago",
        value: "23/Sep/2023",
      },
      {
        id: "next_payment_value",
        label: "Valor próximo pago",
        value: 150000,
      },
      {
        id: "due_date",
        label: "Fecha vencimiento",
        value: "23/Oct/2023",
      },
      {
        id: "payment_method",
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
