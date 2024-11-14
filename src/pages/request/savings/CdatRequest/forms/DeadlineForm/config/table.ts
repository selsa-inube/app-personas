import { IRateTerm } from "../types";

const currentIntRateTableTitles = [
  {
    id: "deadlineFrom",
    titleName: "Plazo desde",
    priority: 0,
  },
  {
    id: "deadlineTo",
    titleName: "Plazo hasta",
    priority: 1,
  },
  {
    id: "rate",
    titleName: "Tasa",
    priority: 3,
  },
];

const mapRateTermsEntries = (rateTerms: IRateTerm[]) => {
  return rateTerms.map((rateTerm, index) => {
    return {
      id: `rateTerm-${index}`,
      deadlineFrom: `${rateTerm.deadlineFrom} días`,
      deadlineTo: `${rateTerm.deadlineTo} días`,
      rate: `${rateTerm.rate} %`,
    };
  });
};

export { currentIntRateTableTitles, mapRateTermsEntries };
