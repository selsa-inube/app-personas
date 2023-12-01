import { mapInvestmentMovement } from "@pages/admin/savings/SavingsAccountMovements/config/table";

const personalAssetsTableTitles = [
  {
    id: "assetType",
    titleName: "Tipo de activo",
    priority: 5,
  },
  {
    id: "assetName",
    titleName: "Nombre del activo",
    priority: 0,
  },
  {
    id: "commercialValue",
    titleName: "Valor comercial",
    priority: 1,
  },
  {
    id: "debtBalance",
    titleName: "Saldo de la deuda",
    priority: 2,
  },
  {
    id: "financialEntity",
    titleName: "Entidad financiera",
    priority: 3,
  },
  {
    id: "quota",
    titleName: "Cuota",
    priority: 4,
  },
];

const personalAssetsTableBreakpoints = [
  { breakpoint: "(min-width: 1450px)", totalColumns: 6 },
  { breakpoint: "(max-width: 1405px)", totalColumns: 5 },
  { breakpoint: "(max-width: 1265px)", totalColumns: 4 },
  { breakpoint: "(max-width: 1120px)", totalColumns: 3 },
  { breakpoint: "(max-width: 970px)", totalColumns: 2 },
  { breakpoint: "(max-width: 860px)", totalColumns: 3 },
  { breakpoint: "(max-width: 730px)", totalColumns: 2 },
  { breakpoint: "(max-width: 585px)", totalColumns: 1 },
];

export {
  mapInvestmentMovement,
  personalAssetsTableBreakpoints,
  personalAssetsTableTitles,
};
