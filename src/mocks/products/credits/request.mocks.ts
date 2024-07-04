const products = {
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
  buyVehicle: [products.freeInvestment, products.vehicleOrMotorcycle],
  buyMotorcycle: [products.freeInvestment, products.vehicleOrMotorcycle],
  buyProperty: [products.freeInvestment],
  travel: [products.freeInvestment],
  study: [products.freeInvestment],
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

export {
  destinationProductsMock,
  interestRatesMock,
  maxDeadlineMock,
  maximumQuotasAvailableMock,
};
