import { mapInvestmentMovement } from "@pages/admin/investments/InvestmentMovements/config/table";

const personalAssetsTableTitles = [
  {
    id: "assetType",
    titleName: "Tipo de activo",
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
  { breakpoint: "(min-width: 1229px)", totalColumns: 5 },
  { breakpoint: "(max-width: 1120px)", totalColumns: 4 },
  { breakpoint: "(max-width: 1000px)", totalColumns: 3 },
  { breakpoint: "(max-width: 900px)", totalColumns: 4 },
  { breakpoint: "(max-width: 860px)", totalColumns: 3 },
  { breakpoint: "(max-width: 600px)", totalColumns: 2 },
  { breakpoint: "(max-width: 390px)", totalColumns: 1 },
];

export {
  mapInvestmentMovement,
  personalAssetsTableBreakpoints,
  personalAssetsTableTitles,
};
