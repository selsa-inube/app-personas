import { IProduct } from "@ptypes/pages/product.types";

const investmentsMock: IProduct[] = [
  {
    id: "IKM92743",
    title: "CDAT",
    attributes: [
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: "16/Feb/2023",
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
        value: "15 Dias",
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
        value: "01/Feb/2023",
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
    id: "AP781230",
    title: "Ahorro programado",
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
        ]
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
            label: "Felipe Lopez",
            value: "25%",
          },
          {
            id: "beneficiarie-3",
            label: "Andrea Lopez",
            value: "25%",
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
        description: "Traslado excedentes Mayo 05 de 2023 - 1543342 Aplicar abono proceso 1543342",
        totalValue: 150000,
      },
    ]
  },
  {
    id: "ILD79545",
    title: "CDAT",
    attributes: [
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: "15/Ene/2024",
      },
      {
        id: "investment_value",
        label: "Valor",
        value: 12137100,
      },
      {
        id: "interest_rate",
        label: "Tasa (%)",
        value: "0,6% NAMV",
      },
      {
        id: "deadline_days",
        label: "Plazo en días",
        value: "60 Días",
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: [
          {
            id: "beneficiarie-1",
            label: "Gabriel Hernandez",
            value: "20%",
          },
          {
            id: "beneficiarie-2",
            label: "Mario Moreno",
            value: "20%",
          },
          {
            id: "beneficiarie-3",
            label: "Lucia Grajales",
            value: "30%",
          },
          {
            id: "beneficiarie-4",
            label: "Armando Santamaria",
            value: "10%",
          },
        ],
      },
      {
        id: "request_date",
        label: "Fecha de solicitud",
        value: "05/Sep/2023",
      },
      {
        id: "description",
        label: "Descripción",
        value: "Certificado",
      },
    ],
    userOwner: "2",
  },
  {
    id: "AP782103",
    title: "Ahorro programado",
    attributes: [
      {
        id: "investment_value",
        label: "Saldo total",
        value: 300000,
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
            value: "Bancolombia",
          },
          {
            id: "account_type",
            label: "Tipo de cuenta",
            value: "Cuenta de ahorros",
          },
          {
            id: "account_number",
            label: "Número de cuenta",
            value: "013010061432Z",
          },
        ]
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: [
          {
            id: "beneficiarie-1",
            label: "Nora Sanchez",
            value: "50%",
          },
          {
            id: "beneficiarie-2",
            label: "Martin Diaz",
            value: "20%",
          },
          {
            id: "beneficiarie-3",
            label: "Santiago Diaz",
            value: "10%",
          },
          {
            id: "beneficiarie-4",
            label: "Sofia Diaz",
            value: "10%",
          },
          {
            id: "beneficiarie-5",
            label: "Valeria Diaz",
            value: "10%",
          },
        ],
      },
    ],
    userOwner: "2",
    movements: [
      {
        id: "movement-1",
        date: "10/Jun/2023",
        reference: "NI1000295",
        description: "Traslado excedentes Junio 10 de 2023 - 1543777 Aplicar abono proceso 1543777",
        totalValue: 300000,
      },
    ]
  },
];

export { investmentsMock };
