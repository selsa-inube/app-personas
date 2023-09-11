import { IProduct } from "@ptypes/pages/product.types";

const investmentsMock: IProduct[] = [
  {
    id: "2-231000619",
    title: "CDAT",
    description: "2 - 231000619",
    type: "CD",
    attributes: [
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: "30/Jun/2023",
      },
      {
        id: "investment_value",
        label: "Valor",
        value: 3582900,
      },
      {
        id: "interest_rate",
        label: "Tasa (%)",
        value: "0,5 % NAMV",
      },
      {
        id: "deadline_days",
        label: "Plazo en días",
        value: "180 Dias",
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
    userOwner: "1",
  },
  {
    id: "2-23110125",
    title: "Ahorro programado",
    description: "Ahorro programado 2 - 23110125",
    type: "AP",
    attributes: [
      {
        id: "investment_value",
        label: "Saldo total",
        value: 150000,
      },
      {
        id: "interest_rate",
        label: "Tasa de interés",
        value: "6,05 % NAMV",
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
    userOwner: "1",
    movements: [
      {
        id: "movement-1",
        date: "05/May/2023",
        reference: "NI1000076",
        description:
          "Traslado excedentes Mayo 05 de 2023 - 1543342 Aplicar abono proceso 1543342",
        totalValue: 150000,
      },
    ],
  },
];

export { investmentsMock };
