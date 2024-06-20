import { IServerDomain } from "@ptypes/domain.types";

const creditProductTypeData: IServerDomain[] = [
  {
    id: "freeInvestment",
    value: "Libre inversión",
    description: "Financia cualquiera de tus proyectos.",
  },
  {
    id: "vehicleOrMotorcycle",
    value: "Compra de vehículo o moto",
    description: "Compra de vehículo nuevo o usado.",
  },
  // { // TEMP
  //   id: "generateRecommendation",
  //   value: "Generar recomendación",
  //   description: "El sistema genera la mejor opción de crédito para ti.",
  // },
];

export { creditProductTypeData };
