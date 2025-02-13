import { IValidation } from "src/model/entity/service";

const productsMock = {
  freeInvestment: {
    id: "freeInvestment",
    title: "Libre inversión",
    description: "Financia cualquiera de tus proyectos.",
    maxRate: 2.84,
    maxDeadline: 30,
    maxAmount: 8300000,
  },
  vehicleOrMotorcycle: {
    id: "vehicleOrMotorcycle",
    title: "Compra de vehículo o moto",
    description: "Compra de vehículo nuevo o usado.",
    maxRate: 2.84,
    maxDeadline: 14,
    maxAmount: 15000000,
  },
  // { // TEMP
  //   id: "generateRecommendation",
  //   value: "Generar recomendación",
  //   description: "El sistema genera la mejor opción de crédito para ti.",
  // },
};

const destinationProductsMock = {
  buyVehicle: [productsMock.freeInvestment, productsMock.vehicleOrMotorcycle],
  buyMotorcycle: [
    productsMock.freeInvestment,
    productsMock.vehicleOrMotorcycle,
  ],
  buyProperty: [productsMock.freeInvestment],
  travel: [productsMock.freeInvestment],
  study: [productsMock.freeInvestment],
};

const maximumQuotasAvailableMock = {
  buyVehicle: {
    noWarranty: 8300000,
    withCoDebtors: 12500000,
    withStrengthening: 25000000,
    realWarranty: 45000000,
  },
  buyMotorcycle: {
    noWarranty: 8300000,
    withCoDebtors: 12500000,
    withStrengthening: 25000000,
    realWarranty: 45000000,
  },
  buyProperty: {
    noWarranty: 8300000,
    withCoDebtors: 12500000,
    withStrengthening: 25000000,
    realWarranty: 45000000,
  },
  travel: {
    noWarranty: 8300000,
    withCoDebtors: 12500000,
    withStrengthening: 25000000,
    realWarranty: 45000000,
  },
  study: {
    noWarranty: 8300000,
    withCoDebtors: 12500000,
    withStrengthening: 25000000,
    realWarranty: 45000000,
  },
  other: {
    noWarranty: 8300000,
    withCoDebtors: 12500000,
    withStrengthening: 25000000,
    realWarranty: 45000000,
  },
};

const interestRatesMock = {
  buyVehicle: 2.84,
  buyMotorcycle: 2.84,
  buyProperty: 2.84,
  travel: 2.84,
  study: 2.84,
};

const maxDeadlineMock = {
  freeInvestment: 30,
  vehicleOrMotorcycle: 14,
};

const documentaryRequirementsMock: IValidation[] = [
  {
    id: "113",
    label: "Factura original",
    value: "pending",
    required: true,
  },
  {
    id: "114",
    label: "Fotocopia de la fórmula médica",
    value: "pending",
  },
];

const systemValidationsMock: IValidation[] = [
  {
    id: "minimum_associate_seniority",
    label: "Antigüedad mínima como asociado",
    value: "success",
    required: true,
  },
  {
    id: "up_to_date_obligations",
    label: "Estar al día con sus obligaciones",
    value: "success",
    required: true,
  },
  {
    id: "request_value_per_formula",
    label:
      "Valor de la solicitud igual o superior al 15% de 1 SMMLV por fórmula",
    value: "success",
  },
  {
    id: "have_savings_in_sight",
    label: "Poseer ahorro a la vista (Si no posee acérquese a la oficina)",
    value: "success",
  },
  {
    id: "available_assistance_quota",
    label: "Cupo disponible auxilios",
    value: "success",
    required: true,
  },
  {
    id: "beneficiary_validity_by_age",
    label: "Valida beneficiario edad",
    value: "success",
  },
];

export {
  destinationProductsMock,
  documentaryRequirementsMock,
  interestRatesMock,
  maxDeadlineMock,
  maximumQuotasAvailableMock,
  systemValidationsMock,
};
