import { ICommitment } from "@ptypes/pages/product.types";

const investmentsCommitments: ICommitment[] = [
  {
    id: "commitment-1",
    title: "Obligaciones estatutarias",
    attributes: [
      {
        id: "next_pay_date",
        label: "Fecha próximo pago",
        value: "30/Sep/2023",
      },
      {
        id: "value_to_pay",
        label: "Valor a pagar",
        value: 210000,
      },
      {
        id: "due_date",
        label: "Fecha vencimiento",
        value: "30/Sep/2023",
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
  {
    id: "commitment-2",
    title: "Abono a cuenta",
    attributes: [
      {
        id: "next_pay_date",
        label: "Fecha próximo pago",
        value: "immediate",
      },
      {
        id: "value_to_pay",
        label: "Valor a pagar",
        value: 80000,
      },
      {
        id: "due_date",
        label: "Fecha vencimiento",
        value: "10/Ene/2023",
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
    tags: [
      {
        label: "En mora",
        appearance: "error",
      },
    ],
    products: ["2-23110125"],
  },
];

export { investmentsCommitments };
