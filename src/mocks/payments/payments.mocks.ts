import { IPayment } from "src/model/entity/payment";

const paymentsMock: IPayment[] = [
  {
    id: "10-241000476",
    title: "CREDI-APORTES GASTOS PERSONALES",
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
        value: 75000,
      },
      {
        id: "totalValue",
        label: "Pago total",
        value: 550000,
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
];

export { paymentsMock };
