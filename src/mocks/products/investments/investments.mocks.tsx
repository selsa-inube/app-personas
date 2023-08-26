import { IProduct } from "@ptypes/pages/product.types";

const investmentsMock: IProduct[] = [
  {
    id: "IKM92743",
    title: "CDAT",
    attributes: [
      {
        id: "investment_value",
        label: "Valor",
        value: "$3.582.900",
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
        value: ["John Doe"],
      },
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: "16/Feb/2023",
      },
      {
        id: "request_date",
        label: "Fecha de solicitud",
        value: "01/Feb/2023",
      },
      {
        id: "Descripción:",
        label: "Fecha de solicitud",
        value: "Certificado de Depósito de Ahorro a Término fijo.",
      },
    ],
    userOwner: "1",
  },
  {
    id: "IVJ75434",
    title: "CDT",
    attributes: [
      {
        id: "investment_value",
        label: "Valor",
        value: "$1.387.500",
      },
      {
        id: "interest_rate",
        label: "Tasa (%)",
        value: "0,7 %",
      },
      {
        id: "deadline_days",
        label: "Plazo en días",
        value: "45 días",
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: ["Alice Johnson", "Bob Williams"],
      },
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: "30/Nov/2023",
      },
      {
        id: "request_date",
        label: "Fecha de solicitud",
        value: "20/Ago/2023",
      },
      {
        id: "description",
        label: "Descripción",
        value: "Certificado de Depósito a Término.",
      },
    ],
    userOwner: "1",
  },
  {
    id: "ILD79545",
    title: "CDAT",
    attributes: [
      {
        id: "investment_value",
        label: "Valor",
        value: "$12.137.100",
      },
      {
        id: "interest_rate",
        label: "Tasa (%)",
        value: "0,6%",
      },
      {
        id: "deadline_days",
        label: "Plazo en días",
        value: "60 Días",
      },
      {
        id: "beneficiaries",
        label: "Beneficiarios",
        value: ["Michael Brown", "Emma Lee", "Jane Smith"],
      },
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: "15/Ene/2024",
      },
      {
        id: "request_date",
        label: "Fecha de solicitud",
        value: "05/Sep/2023",
      },
      {
        id: "description",
        label: "Descripción",
        value: "Certificado de Depósito de Ahorro a Término fijo.",
      },
    ],
    userOwner: "2",
  },
  {
    id: "ICR72145",
    title: "CDT",
    attributes: [
      {
        id: "investment_value",
        label: "Valor",
        value: "$3.017.700",
      },
      {
        id: "interest_rate",
        label: "Tasa (%)",
        value: "0,8%",
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
          "Sophia Clark",
          "William Johnson",
          "Alice Johnsson",
          "Bob Willians",
        ],
      },
      {
        id: "expiration_date",
        label: "Fecha de vencimiento",
        value: "20/Dic/2023",
      },
      {
        id: "request_date",
        label: "Fecha de solicitud",
        value: "15/Ago/2023",
      },
      {
        id: "description",
        label: "Descripción",
        value: "Certificado de Depósito a Término.",
      },
    ],
    userOwner: "2",
  },
];

export { investmentsMock };
