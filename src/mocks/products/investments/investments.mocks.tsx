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
            label: "Alice Johnson",
            value: "75%",
          },
          {
            id: "beneficiarie-2",
            label: "Bob Williams",
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
            label: "Eva Smith",
            value: "50%",
          },
          {
            id: "beneficiarie-2",
            label: "Michael Brown",
            value: "25%",
          },
          {
            id: "beneficiarie-3",
            label: "Sophia Davis",
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
            label: "Oliver Wilson",
            value: "20%",
          },
          {
            id: "beneficiarie-2",
            label: "Sophie Johnson",
            value: "20%",
          },
          {
            id: "beneficiarie-3",
            label: "Liam Davis",
            value: "30%",
          },
          {
            id: "beneficiarie-4",
            label: "Ava Smith",
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
            label: "Noah Brown",
            value: "50%",
          },
          {
            id: "beneficiarie-2",
            label: "Mia Wilson",
            value: "20%",
          },
          {
            id: "beneficiarie-3",
            label: "Ethan Anderson",
            value: "10%",
          },
          {
            id: "beneficiarie-4",
            label: "Olivia Davis",
            value: "10%",
          },
          {
            id: "beneficiarie-5",
            label: "Liam Harris",
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
