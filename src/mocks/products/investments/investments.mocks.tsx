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
    id: "IVJ75434",
    title: "CDAT",
    attributes: [
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: "30/Nov/2023",
      },
      {
        id: "investment_value",
        label: "Valor",
        value: 1387500,
      },
      {
        id: "interest_rate",
        label: "Tasa (%)",
        value: "0,7 % NAMV",
      },
      {
        id: "deadline_days",
        label: "Plazo en días",
        value: "45 días",
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
      {
        id: "request_date",
        label: "Fecha de solicitud",
        value: "20/Ago/2023",
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
    id: "ICR72145",
    title: "CDAT",
    attributes: [
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: "20/Dic/2023",
      },
      {
        id: "investment_value",
        label: "Valor",
        value: 3017700,
      },
      {
        id: "interest_rate",
        label: "Tasa (%)",
        value: "0,8% NAMV",
      },
      {
        id: "deadline_days",
        label: "Plazo en días",
        value: "40 Días",
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
      {
        id: "request_date",
        label: "Fecha de solicitud",
        value: "15/Ago/2023",
      },
      {
        id: "description",
        label: "Descripción",
        value: "Certificado",
      },
    ],
    userOwner: "2",
  },
];

export { investmentsMock };
