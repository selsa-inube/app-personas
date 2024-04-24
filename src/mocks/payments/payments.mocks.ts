import { IPayment } from "src/model/entity/payment";

const paymentsMock: IPayment[] = [
  {
    id: "10-241000476",
    title: "CREDI-APORTES GASTOS PERSONALES",
    group: "credits",
    paymentMethod: "monthly",
    status: "anywhere",
    options: [
      {
        id: "expiredValue",
        label: "Valor vencido",
        value: 0,
      },
      {
        id: "nextValue",
        label: "Próximo vencimiento",
        description: "15/Abr/2024",
        value: 150000,
      },
      {
        id: "totalValue",
        label: "Pago total",
        value: 828022,
      },
      {
        id: "otherValue",
        label: "Próximo vencimiento",
        value: 0,
        hidden: true,
      },
    ],
    tags: [
      {
        label: "Fondecom mensual",
        appearance: "primary",
        modifier: "clear",
        textAppearance: "primary",
      },
    ],
  },
  {
    id: "10-241000477",
    title: "TEMPORADA GASTOS PERSONALES",
    group: "savings",
    paymentMethod: "automaticDebit",
    status: "anywhere",
    options: [
      {
        id: "expiredValue",
        label: "Valor vencido",
        value: 0,
      },
      {
        id: "nextValue",
        label: "Próximo vencimiento",
        description: "15/Abr/2024",
        value: 395000,
      },
      {
        id: "totalValue",
        label: "Pago total",
        value: 4500000,
      },
      {
        id: "otherValue",
        label: "Próximo vencimiento",
        value: 0,
        hidden: true,
      },
    ],
    tags: [
      {
        label: "Debito automático",
        appearance: "primary",
        modifier: "clear",
        textAppearance: "primary",
      },
    ],
  },
  {
    id: "10-241000478",
    title: "TEMPORADA GASTOS PERSONALES",
    group: "savings",
    paymentMethod: "window",
    status: "anywhere",
    options: [
      {
        id: "expiredValue",
        label: "Valor vencido",
        value: 0,
      },
      {
        id: "nextValue",
        label: "Próximo vencimiento",
        description: "15/Abr/2024",
        value: 150000,
      },
      {
        id: "totalValue",
        label: "Pago total",
        value: 1500000,
      },
      {
        id: "otherValue",
        label: "Próximo vencimiento",
        value: 0,
        hidden: true,
      },
    ],
    tags: [
      {
        label: "Ventanilla",
        appearance: "primary",
        modifier: "clear",
        textAppearance: "primary",
      },
    ],
  },
  {
    id: "10-241000479",
    title: "CREDI-APORTES GASTOS PERSONALES",
    group: "credits",
    paymentMethod: "monthly",
    status: "arrears",
    options: [
      {
        id: "expiredValue",
        label: "Valor vencido",
        value: 0,
      },
      {
        id: "nextValue",
        label: "Próximo vencimiento",
        description: "Inmediato",
        value: 75000,
      },
      {
        id: "totalValue",
        label: "Pago total",
        value: 550000,
      },
      {
        id: "otherValue",
        label: "Próximo vencimiento",
        value: 0,
        hidden: true,
      },
    ],
    tags: [
      {
        label: "En mora",
        appearance: "error",
      },
      {
        label: "Fondecom mensual",
        appearance: "primary",
        modifier: "clear",
        textAppearance: "primary",
      },
    ],
  },
];

export { paymentsMock };
