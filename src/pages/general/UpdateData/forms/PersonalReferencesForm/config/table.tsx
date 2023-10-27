import { mapInvestmentMovement } from "@pages/admin/savings/SavingsAccountMovements/config/table";

const personalReferencesTableTitles = [
  {
    id: "referenceType",
    titleName: "Tipo de referencia",
    priority: 1,
  },
  {
    id: "name",
    titleName: "Nombre",
    priority: 0,
  },
  {
    id: "address",
    titleName: "Dirección",
    priority: 3,
  },
  {
    id: "email",
    titleName: "Correo electrónico",
    priority: 2,
  },
  {
    id: "phone",
    titleName: "Celular",
    priority: 4,
  },
  {
    id: "city",
    titleName: "Ciudad",
    priority: 5,
  },
];

const personalReferencesTableBreakpoints = [
  { breakpoint: "(min-width: 1329px)", totalColumns: 6 },
  { breakpoint: "(max-width: 1280px)", totalColumns: 5 },
  { breakpoint: "(max-width: 1190px)", totalColumns: 4 },
  { breakpoint: "(max-width: 1130px)", totalColumns: 3 },
  { breakpoint: "(max-width: 910px)", totalColumns: 2 },
  { breakpoint: "(max-width: 895px)", totalColumns: 4 },
  { breakpoint: "(max-width: 860px)", totalColumns: 3 },
  { breakpoint: "(max-width: 670px)", totalColumns: 2 },
  { breakpoint: "(max-width: 460px)", totalColumns: 1 },
];

export {
  mapInvestmentMovement,
  personalReferencesTableBreakpoints,
  personalReferencesTableTitles,
};
