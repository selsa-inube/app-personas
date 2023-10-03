import { convertDomainToList, convertDomainToOptions } from "../helper";

const activeData = {
  Y: {
    id: "Y",
    value: "Si",
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
