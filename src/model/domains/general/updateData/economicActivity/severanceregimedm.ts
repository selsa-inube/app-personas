import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const severanceRegimeData = {
  RETROACTIVE_SYSTEM: {
    id: "retroactiveSystem",
    value: "Sistema retroactivo",
  },
  AVERAGE_SALARY: {
    id: "averageSalary",
    value: "Salario promedio",
  },
  INTEGRAL_SALARY: {
    id: "integralSalary",
    value: "Salario integral",
  },
  FIXED_TERM_CONTRACT: {
    id: "fixedTermContract",
    value: "Contrato a término fijo",
  },
  INDEFINITE_TERM_CONTRACT: {
    id: "indefiniteTermContract",
    value: "Contrato a término indefinido",
  },
};

const severanceRegimeDMValueOf = (id: string) =>
  Object.values(severanceRegimeData).find((item) => item.id === id);

const severanceRegimeDM = {
  ...severanceRegimeData,
  list: convertDomainToList(severanceRegimeData),
  options: convertDomainToOptions(severanceRegimeData),
  valueOf: severanceRegimeDMValueOf,
};

export { severanceRegimeDM };
