import { getValueOfDomain } from "@mocks/domains/domainService.mocks";

const productFreeInvestment = getValueOfDomain(
  "freeInvestment",
  "creditProductType"
);
const productVehicleOrMotorcycle = getValueOfDomain(
  "vehicleOrMotorcycle",
  "creditProductType"
);

const destinationProductsMock = {
  buyVehicle: [productFreeInvestment, productVehicleOrMotorcycle],
  buyMotorcycle: [productFreeInvestment, productVehicleOrMotorcycle],
  buyProperty: [productFreeInvestment],
  travel: [productFreeInvestment],
  study: [productFreeInvestment],
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
