import { ICommitment } from "src/model/entity/product";

const savingsCommitmentsMock: ICommitment[] = [
  {
    id: "2 - 236607895",
    title: "Obligaciones estatutarias",
    description: "Compromiso de ahorro",
    type: "0S",
    attributes: [
      {
        id: "next_pay_date",
        label: "Fecha de pago",
        value: "inmediato",
      },
      {
        id: "value_to_pay",
        label: "Valor de pago",
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
    products: ["201-91214069", "200-91214069"],
  },
  {
    id: "2 - 236607896",
    title: "Abono a cuenta",
    description: "Compromiso de ahorro",
    type: "SC",
    attributes: [
      {
        id: "next_pay_date",
        label: "Fecha de pago",
        value: "30/Sep/2023",
      },
      {
        id: "value_to_pay",
        label: "Valor de pago",
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
    products: ["013001157292"],
  },
];

export { savingsCommitmentsMock };
