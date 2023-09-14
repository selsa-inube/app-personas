import { ICommitment } from "src/model/entity/product";

const savingsCommitmentsMock: ICommitment[] = [
  {
    id: "statutory_obligations",
    title: "Obligaciones estatutarias",
    attributes: [
      {
        id: "next_pay_date",
        label: "Fecha próximo pago",
        value: "immediate",
      },
      {
        id: "value_to_pay",
        label: "Valor a pagar",
        value: 160000,
      },
      {
        id: "due_date",
        label: "Fecha vencimiento",
        value: "30/Ene/2023",
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
    tag: {
      label: "En mora",
      appearance: "error",
    },
    products: ["201-91214069"],
  },
  {
    id: "pass_acount",
    title: "Abono a cuenta",
    attributes: [
      {
        id: "next_pay_date",
        label: "Fecha próximo pago",
        value: "30/Sep/2023",
      },
      {
        id: "value_to_pay",
        label: "Valor a pagar",
        value: 65000,
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
    products: ["201-91214069"],
  },
];

export { savingsCommitmentsMock };
