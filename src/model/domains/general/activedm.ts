import { convertDomainToOptions, convertDomainToList } from "src/utils/domains";

const activeData = {
  Y: {
    id: "Y",
    value: "Sí",
  },
  N: {
    id: "N",
    value: "No",
  },
};

const activeDMValueOf = (id: string) =>
  convertDomainToOptions(activeData).find((city) => city.id === id);

const activeDM = {
  ...activeData,
  list: convertDomainToList(activeData),
  options: convertDomainToOptions(activeData),
  valueOf: activeDMValueOf,
};

export { activeDM };
