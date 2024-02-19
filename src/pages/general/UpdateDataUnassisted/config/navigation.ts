import { IBreadcrumbItem } from "@design/navigation/Breadcrumbs";

const crumbsUpdateData: IBreadcrumbItem[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
  },
  {
    id: "updateData",
    path: "/update-data-no-assisted",
    label: "Actualización de datos",
    isActive: true,
  },
];

const tabsConfig = {
  personalInformation: {
    id: "personalInformation",
    isDisabled: false,
    label: "Información personal",
  },
  contactData: {
    id: "contactData",
    isDisabled: false,
    label: "Datos de contacto",
  },
  familyGroup: {
    id: "familyGroup",
    isDisabled: false,
    label: "Grupo familiar",
  },
  bankTransfers: {
    id: "bankTransfers",
    isDisabled: false,
    label: "Transferencias bancarias",
  },
  personalAssets: {
    id: "personalAssets",
    isDisabled: false,
    label: "Activos personales",
  },
  personalDebts: {
    id: "personalDebts",
    isDisabled: false,
    label: "Deudas personales",
  },
  personalReferences: {
    id: "personalReferences",
    isDisabled: false,
    label: "Referencias personales",
  },
  financialOperations: {
    id: "financialOperations",
    isDisabled: false,
    label: "Operaciones financieras",
  },
  personalResidence: {
    id: "personalResidence",
    isDisabled: false,
    label: "Residencia personal",
  },
  socioeconomicInformation: {
    id: "socioeconomicInformation",
    isDisabled: false,
    label: "Información socioeconómica",
  },
  economicActivity: {
    id: "economicActivity",
    isDisabled: false,
    label: "Actividad económica",
  },
  income: {
    id: "income",
    isDisabled: false,
    label: "Ingresos",
  },
  expenses: {
    id: "expenses",
    isDisabled: false,
    label: "Egresos",
  },
  relationshipWithDirectors: {
    id: "relationshipWithDirectors",
    isDisabled: false,
    label: "Relación con directivos",
  },
};

export { tabsConfig, crumbsUpdateData };
