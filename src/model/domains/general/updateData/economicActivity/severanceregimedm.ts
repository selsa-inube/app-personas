import { convertDomainToList, convertDomainToOptions } from "../../../helper";

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
  convertDomainToOptions(severanceRegimeData).find(
    (severanceRegime) => severanceRegime.id === id,
  );

const severanceRegimeDM = {
  ...severanceRegimeData,
  list: convertDomainToList(severanceRegimeData),
  options: convertDomainToOptions(severanceRegimeData),
  valueOf: severanceRegimeDMValueOf,
};

export { severanceRegimeDM };
