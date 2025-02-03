import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const vulnerablePopulationData = {
  BLACK: {
    id: "black",
    value: "Afrodescendientes, negros o mulatos",
  },
  DISPLACED: {
    id: "displaced",
    value: "Desplazado",
  },
  DISABLED: {
    id: "disabled",
    value: "Discapacitado",
  },
  ROMANI: {
    id: "romani",
    value: "Rom o gitanos",
  },
  INDIGENOUS: {
    id: "indigenous",
    value: "Indígena",
  },
  YOUTH: {
    id: "youth",
    value: "Joven",
  },
  LGBTI: {
    id: "lgbti",
    value: "LGBTI",
  },
  PALENQUERO: {
    id: "Palenquero",
    value: "Palenquero",
  },
  DETAINED: {
    id: "detained",
    value: "Privado de la libertad",
  },
  RAIZALES: {
    id: "raizales",
    value: "Raizales",
  },
  REINSERTED: {
    id: "reinserted",
    value: "Reinsertado",
  },
  VICTIM: {
    id: "victim",
    value: "Registrado como víctima",
  },
  PROSTITUTION: {
    id: "prostitution",
    value: "Ejerce la prostitución",
  },
  NA: {
    id: "na",
    value: "No Aplica",
  },
};

const vulnerablePopulationDMValueOf = (id: string) =>
  Object.values(vulnerablePopulationData).find((type) => type.id === id);

const vulnerablePopulationTypeDM = {
  ...vulnerablePopulationData,
  list: convertDomainToList(vulnerablePopulationData),
  options: convertDomainToOptions(vulnerablePopulationData),
  valueOf: vulnerablePopulationDMValueOf,
};

export { vulnerablePopulationTypeDM };
