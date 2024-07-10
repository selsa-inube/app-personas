import { requestStatusDM } from "src/model/domains/credits/requestStatusDM";
import { IRequest } from "src/model/entity/request";

const requestsMock: IRequest[] = [
  {
    id: "55812345789-1",
    title: "Crédito",
    product: "Libre inversión",
    destination: "Compra moto",
    trackingCode: "SC20105005",
    requestDate: new Date("2024-06-20T01:33:00.000Z"),
    description:
      "Crédito por destinación 41-241000098 Emp: FONDO DE EMPLEADOS DE LA CAJA DE COMPENSACION FAMILIAR DEL VALLE DEL CAUCA",
    status: requestStatusDM.CREATED.id,
    value: 5000000,
    quotaValue: 15000,
    periodicity: "Mensual",
    deadline: "15 Meses",
    interestRate: 2.84,
    netValue: 4750000,
    validations: [
      {
        id: "minimum_associate_seniority",
        label: "Antigüedad mínima como asociado",
        value: "pending",
        isRequired: true,
      },
      {
        id: "up_to_date_obligations",
        label: "Estar al día con sus obligaciones Fondecom",
        value: "pending",
        isRequired: true,
      },
      {
        id: "request_value_per_formula",
        label:
          "Valor de la solicitud igual o superior al 15% de 1 SMMLV por fórmula",
        value: "pending",
      },
      {
        id: "have_savings_in_sight",
        label:
          "Poseer ahorro a la vista (Si no posee acérquese a la oficina fondecom)",
        value: "pending",
      },
      {
        id: "available_assistance_quota",
        label: "Cupo disponible auxilios",
        value: "pending",
        isRequired: true,
      },
      {
        id: "beneficiary_validity_by_age",
        label: "Valida beneficiario edad",
        value: "pending",
      },
    ],
    documentaryRequirements: [
      {
        id: "original_invoice",
        label: "Factura original",
        value: "pending",
        isRequired: true,
      },
      {
        id: "medical_prescription_copy",
        label: "Fotocopia de la fórmula médica",
        value: "pending",
      },
    ],
  },
  {
    id: "55812345789-2",
    title: "Crédito",
    product: "Libre inversión",
    destination: "Compra moto",
    trackingCode: "SC20105005",
    requestDate: new Date("2024-06-20T01:33:00.000Z"),
    description:
      "Crédito por destinación 41-241000098 Emp: FONDO DE EMPLEADOS DE LA CAJA DE COMPENSACION FAMILIAR DEL VALLE DEL CAUCA",
    status: requestStatusDM.IN_STUDY.id,
    value: 5000000,
    quotaValue: 15000,
    periodicity: "Mensual",
    deadline: "15 Meses",
    interestRate: 2.84,
    netValue: 4750000,
    validations: [
      {
        id: "minimum_associate_seniority",
        label: "Antigüedad mínima como asociado",
        value: "pending",
        isRequired: true,
      },
      {
        id: "up_to_date_obligations",
        label: "Estar al día con sus obligaciones Fondecom",
        value: "pending",
        isRequired: true,
      },
      {
        id: "request_value_per_formula",
        label:
          "Valor de la solicitud igual o superior al 15% de 1 SMMLV por fórmula",
        value: "pending",
      },
      {
        id: "have_savings_in_sight",
        label:
          "Poseer ahorro a la vista (Si no posee acérquese a la oficina fondecom)",
        value: "pending",
      },
      {
        id: "available_assistance_quota",
        label: "Cupo disponible auxilios",
        value: "pending",
        isRequired: true,
      },
      {
        id: "beneficiary_validity_by_age",
        label: "Valida beneficiario edad",
        value: "pending",
      },
    ],
    documentaryRequirements: [
      {
        id: "original_invoice",
        label: "Factura original",
        value: "pending",
        isRequired: true,
      },
      {
        id: "medical_prescription_copy",
        label: "Fotocopia de la fórmula médica",
        value: "pending",
      },
    ],
  },
  {
    id: "55812345789-3",
    title: "Crédito",
    product: "Libre inversión",
    destination: "Compra moto",
    trackingCode: "SC20105005",
    requestDate: new Date("2024-06-20T01:33:00.000Z"),
    description:
      "Crédito por destinación 41-241000098 Emp: FONDO DE EMPLEADOS DE LA CAJA DE COMPENSACION FAMILIAR DEL VALLE DEL CAUCA",
    status: requestStatusDM.IN_PROGRESS.id,
    value: 5000000,
    quotaValue: 15000,
    periodicity: "Mensual",
    deadline: "15 Meses",
    interestRate: 2.84,
    netValue: 4750000,
    validations: [
      {
        id: "minimum_associate_seniority",
        label: "Antigüedad mínima como asociado",
        value: "pending",
        isRequired: true,
      },
      {
        id: "up_to_date_obligations",
        label: "Estar al día con sus obligaciones Fondecom",
        value: "pending",
        isRequired: true,
      },
      {
        id: "request_value_per_formula",
        label:
          "Valor de la solicitud igual o superior al 15% de 1 SMMLV por fórmula",
        value: "pending",
      },
      {
        id: "have_savings_in_sight",
        label:
          "Poseer ahorro a la vista (Si no posee acérquese a la oficina fondecom)",
        value: "pending",
      },
      {
        id: "available_assistance_quota",
        label: "Cupo disponible auxilios",
        value: "pending",
        isRequired: true,
      },
      {
        id: "beneficiary_validity_by_age",
        label: "Valida beneficiario edad",
        value: "pending",
      },
    ],
    documentaryRequirements: [
      {
        id: "original_invoice",
        label: "Factura original",
        value: "pending",
        isRequired: true,
      },
      {
        id: "medical_prescription_copy",
        label: "Fotocopia de la fórmula médica",
        value: "pending",
      },
    ],
  },
  {
    id: "55812345789-4",
    title: "Crédito",
    product: "Libre inversión",
    destination: "Compra moto",
    trackingCode: "SC20105005",
    requestDate: new Date("2024-06-20T01:33:00.000Z"),
    description:
      "Crédito por destinación 41-241000098 Emp: FONDO DE EMPLEADOS DE LA CAJA DE COMPENSACION FAMILIAR DEL VALLE DEL CAUCA",
    status: requestStatusDM.IN_DISBURSEMENT.id,
    value: 5000000,
    quotaValue: 15000,
    periodicity: "Mensual",
    deadline: "15 Meses",
    interestRate: 2.84,
    netValue: 4750000,
    validations: [
      {
        id: "minimum_associate_seniority",
        label: "Antigüedad mínima como asociado",
        value: "pending",
        isRequired: true,
      },
      {
        id: "up_to_date_obligations",
        label: "Estar al día con sus obligaciones Fondecom",
        value: "pending",
        isRequired: true,
      },
      {
        id: "request_value_per_formula",
        label:
          "Valor de la solicitud igual o superior al 15% de 1 SMMLV por fórmula",
        value: "pending",
      },
      {
        id: "have_savings_in_sight",
        label:
          "Poseer ahorro a la vista (Si no posee acérquese a la oficina fondecom)",
        value: "pending",
      },
      {
        id: "available_assistance_quota",
        label: "Cupo disponible auxilios",
        value: "pending",
        isRequired: true,
      },
      {
        id: "beneficiary_validity_by_age",
        label: "Valida beneficiario edad",
        value: "pending",
      },
    ],
    documentaryRequirements: [
      {
        id: "original_invoice",
        label: "Factura original",
        value: "pending",
        isRequired: true,
      },
      {
        id: "medical_prescription_copy",
        label: "Fotocopia de la fórmula médica",
        value: "pending",
      },
    ],
  },
  {
    id: "55812345789-5",
    title: "Crédito",
    product: "Libre inversión",
    destination: "Compra moto",
    trackingCode: "SC20105005",
    requestDate: new Date("2024-06-20T01:33:00.000Z"),
    description:
      "Crédito por destinación 41-241000098 Emp: FONDO DE EMPLEADOS DE LA CAJA DE COMPENSACION FAMILIAR DEL VALLE DEL CAUCA",
    status: requestStatusDM.COMPLETED.id,
    value: 5000000,
    quotaValue: 15000,
    periodicity: "Mensual",
    deadline: "15 Meses",
    interestRate: 2.84,
    netValue: 4750000,
    validations: [
      {
        id: "minimum_associate_seniority",
        label: "Antigüedad mínima como asociado",
        value: "pending",
        isRequired: true,
      },
      {
        id: "up_to_date_obligations",
        label: "Estar al día con sus obligaciones Fondecom",
        value: "pending",
        isRequired: true,
      },
      {
        id: "request_value_per_formula",
        label:
          "Valor de la solicitud igual o superior al 15% de 1 SMMLV por fórmula",
        value: "pending",
      },
      {
        id: "have_savings_in_sight",
        label:
          "Poseer ahorro a la vista (Si no posee acérquese a la oficina fondecom)",
        value: "pending",
      },
      {
        id: "available_assistance_quota",
        label: "Cupo disponible auxilios",
        value: "pending",
        isRequired: true,
      },
      {
        id: "beneficiary_validity_by_age",
        label: "Valida beneficiario edad",
        value: "pending",
      },
    ],
    documentaryRequirements: [
      {
        id: "original_invoice",
        label: "Factura original",
        value: "pending",
        isRequired: true,
      },
      {
        id: "medical_prescription_copy",
        label: "Fotocopia de la fórmula médica",
        value: "pending",
      },
    ],
  },
  {
    id: "55812345789-6",
    title: "Crédito",
    product: "Libre inversión",
    destination: "Compra moto",
    trackingCode: "SC20105005",
    requestDate: new Date("2024-06-20T01:33:00.000Z"),
    description:
      "Crédito por destinación 41-241000098 Emp: FONDO DE EMPLEADOS DE LA CAJA DE COMPENSACION FAMILIAR DEL VALLE DEL CAUCA",
    status: requestStatusDM.REJECTED.id,
    value: 5000000,
    quotaValue: 15000,
    periodicity: "Mensual",
    deadline: "15 Meses",
    interestRate: 2.84,
    netValue: 4750000,
    validations: [
      {
        id: "minimum_associate_seniority",
        label: "Antigüedad mínima como asociado",
        value: "pending",
        isRequired: true,
      },
      {
        id: "up_to_date_obligations",
        label: "Estar al día con sus obligaciones Fondecom",
        value: "pending",
        isRequired: true,
      },
      {
        id: "request_value_per_formula",
        label:
          "Valor de la solicitud igual o superior al 15% de 1 SMMLV por fórmula",
        value: "pending",
      },
      {
        id: "have_savings_in_sight",
        label:
          "Poseer ahorro a la vista (Si no posee acérquese a la oficina fondecom)",
        value: "pending",
      },
      {
        id: "available_assistance_quota",
        label: "Cupo disponible auxilios",
        value: "pending",
        isRequired: true,
      },
      {
        id: "beneficiary_validity_by_age",
        label: "Valida beneficiario edad",
        value: "pending",
      },
    ],
    documentaryRequirements: [
      {
        id: "original_invoice",
        label: "Factura original",
        value: "pending",
        isRequired: true,
      },
      {
        id: "medical_prescription_copy",
        label: "Fotocopia de la fórmula médica",
        value: "pending",
      },
    ],
  },
];

export { requestsMock };
