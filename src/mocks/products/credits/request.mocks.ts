const productOptions = {
  freeInvestment: {
    id: "freeInvestment",
    title: "Libre inversión",
    description: "Financia cualquiera de tus proyectos.",
  },
  vehicleOrMotorcycle: {
    id: "vehicleOrMotorcycle",
    title: "Compra de vehículo o moto",
    description: "Compra de vehículo nuevo o usado.",
  },
};

const destinationProducts = {
  buyVehicle: [
    productOptions.freeInvestment,
    productOptions.vehicleOrMotorcycle,
  ],
  buyMotorcycle: [
    productOptions.freeInvestment,
    productOptions.vehicleOrMotorcycle,
  ],
  buyProperty: [productOptions.freeInvestment],
  travel: [productOptions.freeInvestment],
  study: [productOptions.freeInvestment],
};

export { destinationProducts };