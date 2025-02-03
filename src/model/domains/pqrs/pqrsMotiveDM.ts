import { convertDomainToList, convertDomainToOptions } from "src/utils/domains";

const pqrsMotiveDataDomain = {
  ACTIVITIES_AND_EVENTS: {
    id: "ActivitiesAndEvents",
    value: "Actividades y eventos",
  },
  CONTRIBUTIONS_AND_SAVINGS: {
    id: "ContributionsAndSavings",
    value: "Aportes y ahorros",
  },
  AID: {
    id: "Aid",
    value: "Auxilios",
  },
  PORTFOLIO: {
    id: "Portfolio",
    value: "Cartera",
  },
  CERTIFICATES: {
    id: "Certificates",
    value: "Certificados",
  },
  BUSINESS_AGREEMENTS: {
    id: "BusinessAgreements",
    value: "Convenios empresariales",
  },
  CREDITS: {
    id: "Credits",
    value: "Créditos",
  },
  IN_PERSON_ASSOCIATE_MANAGEMENT: {
    id: "InPersonAssociateManagement",
    value: "Gestión al asociado presencial",
  },
};

const motiveDMValueOf = (id: string) =>
  Object.values(pqrsMotiveDataDomain).find((motive) => motive.id === id);

const pqrsMotiveDM = {
  ...pqrsMotiveDataDomain,
  list: convertDomainToList(pqrsMotiveDataDomain),
  options: convertDomainToOptions(pqrsMotiveDataDomain),
  valueOf: motiveDMValueOf,
};

export { pqrsMotiveDM };
