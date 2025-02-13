import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

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
  Object.values(activeData).find((item) => item.id === id);

const activeDM = {
  ...activeData,
  list: convertDomainToList(activeData),
  options: convertDomainToOptions(activeData),
  valueOf: activeDMValueOf,
};

export { activeDM };
