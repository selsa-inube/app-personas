import { IProduct } from "src/model/entity/product";

const investmentsMock: IProduct[] = [
  {
    id: "2-22100619",
    title: "CDAT",
    description: "CDAT 2 - 22100619",
    type: "CD",
    attributes: [
      {
        id: "title",
        label: "Titulo",
        value: "2 - 22100619",
      },
      {
        id: "net_value",
        label: "Valor",
        value: 3582900,
      },
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: "16/Feb/2023",
      },

      {
        id: "interest_rate",
        label: "Tasa de interés",
        value: "9,40 % EA",
      },
      {
        id: "deadline_days",
        label: "Plazo en días",
        value: "180 Dias",
      },
      {
        id: "payment_interest",
        label: "Pago de intereses",
        value: "Periódico",
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: [
          {
            id: "beneficiarie-1",
            label: "Alicia Arenas",
            value: "75%",
          },
          {
            id: "beneficiarie-2",
            label: "Andres Garcia",
            value: "25%",
          },
        ],
      },
      {
        id: "request_date",
        label: "Fecha de solicitud",
        value: "01/Ene/2023",
      },
      {
        id: "description",
        label: "Descripción",
        value: "Certificado",
      },
    ],
    userOwner: "12340001",
  },
  {
    id: "2-23110125",
    title: "Ahorro programado",
    description: "Ahorro programado 2 - 23110125",
    type: "AP",
    attributes: [
      {
        id: "saved_value",
        label: "Total ahorrado",
        value: 150000,
      },
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: "23/Sep/2023",
      },
      {
        id: "net_value",
        label: "Saldo total",
        value: 150000,
      },
      {
        id: "interest_rate",
        label: "Tasa de interés",
        value: "6,05 % EA",
      },
      {
        id: "refund_value",
        label: "Reembolso",
        value: [
          {
            id: "bank_id",
            label: "Cuenta",
            value: "Banco Davivienda",
          },
          {
            id: "account_type",
            label: "Tipo de cuenta",
            value: "Cuenta de ahorros",
          },
          {
            id: "account_number",
            label: "Número de cuenta",
            value: "013010065684Z",
          },
        ],
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: [
          {
            id: "beneficiarie-1",
            label: "Eva Rodriguez",
            value: "50%",
          },
          {
            id: "beneficiarie-2",
            label: "Andrea Lopez",
            value: "50%",
          },
        ],
      },
    ],
    movements: [
      {
        id: "movement-1",
        date: new Date("05/May/2023"),
        reference: "NI1000076",
        description:
          "Traslado excedentes Mayo 05 de 2023 - 1543342 Aplicar abono proceso 1543342",
        totalValue: 150000,
      },
    ],
    userOwner: "12340001",
  },
];

export { investmentsMock };
