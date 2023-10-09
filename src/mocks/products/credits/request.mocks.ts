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
    personalWarranty: 12500000,
    realWarranty: 25000000,
  },
  buyMotorcycle: {
    noWarranty: 8300000,
    personalWarranty: 12500000,
    realWarranty: 25000000,
  },
  buyProperty: {
    noWarranty: 8300000,
    personalWarranty: 12500000,
    realWarranty: 25000000,
  },
  travel: {
    noWarranty: 8300000,
    personalWarranty: 12500000,
    realWarranty: 25000000,
  },
  study: {
    noWarranty: 8300000,
    personalWarranty: 12500000,
    realWarranty: 25000000,
  },
};

const interestRatesMock = {
  buyVehicle: 2.84,
  buyMotorcycle: 2.84,
  buyProperty: 2.84,
  travel: 2.84,
  study: 2.84,
};

export { destinationProductsMock, maximumQuotasAvailableMock, interestRatesMock };
