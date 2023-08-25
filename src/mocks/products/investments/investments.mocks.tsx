import { IProduct } from "@ptypes/pages/product.types";

const investmentsMock: IProduct[] = [
  {
    id: "IKM92743",
    title: "CDAT",
    attributes: [
      {
        id: "investment-CDAT",
        label: "Valor",
        expirationDate: "2023-12-31",
        requestDate: "2023-08-25",
        description: "Certificado de Depósito de Ahorro a Término fijo.",
        value: "$3.582.900",
        interestRate: 0.05,
        deadlineDays: 30,
        beneficiaries: ["John Doe"],
      },
    ],
    userOwner: "1",
  },
  {
    id: "IVJ75434",
    title: "CDT",
    attributes: [
      {
        id: "investment-CDT",
        label: "Valor",
        expirationDate: "2023-11-30",
        requestDate: "2023-08-20",
        description: "Certificado de Depósito a Término.",
        value: "$1.387.500",
        interestRate: 0.07,
        deadlineDays: 45,
        beneficiaries: ["Alice Johnson", "Bob Williams"],
      },
    ],
    userOwner: "1",
  },
  {
    id: "ILD79545",
    title: "CDAT",
    attributes: [
      {
        id: "investment-CDAT",
        label: "Valor",
        expirationDate: "2024-01-15",
        requestDate: "2023-09-05",
        description: "Certificado de Depósito de Ahorro a Término fijo.",
        value: "$12.137.100",
        interestRate: 0.06,
        deadlineDays: 60,
        beneficiaries: ["Michael Brown", "Emma Lee", "Jane Smith"],
      },
    ],
    userOwner: "2",
  },
  {
    id: "ICR72145",
    title: "CDT",
    attributes: [
      {
        id: "investment-CDT",
        label: "Valor",
        expirationDate: "2023-12-20",
        requestDate: "2023-08-15",
        description: "Certificado de Depósito a Término.",
        value: "$3.017.700",
        interestRate: 0.08,
        deadlineDays: 40,
        beneficiaries: [
          "Sophia Clark",
          "William Johnson",
          "Alice Johnsson",
          "Bob Willians",
        ],
      },
    ],
    userOwner: "2",
  },
];

export { investmentsMock };
