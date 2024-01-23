const personalDebtsTableTitles = [
  {
    id: "liabilityType",
    titleName: "Tipo de pasivo",
    priority: 5,
  },
  {
    id: "debtName",
    titleName: "Nombre del pasivo",
    priority: 0,
  },
  {
    id: "terminationDate",
    titleName: "Fecha de terminación",
    priority: 2,
  },
  {
    id: "debtBalance",
    titleName: "Saldo de la deuda",
    priority: 1,
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

const personalDebtsTableBreakpoints = [
  { breakpoint: "(min-width: 1229px)", totalColumns: 6 },
  { breakpoint: "(max-width: 1180px)", totalColumns: 5 },
  { breakpoint: "(max-width: 1120px)", totalColumns: 4 },
  { breakpoint: "(max-width: 1000px)", totalColumns: 3 },
  { breakpoint: "(max-width: 900px)", totalColumns: 4 },
  { breakpoint: "(max-width: 860px)", totalColumns: 3 },
  { breakpoint: "(max-width: 600px)", totalColumns: 2 },
  { breakpoint: "(max-width: 390px)", totalColumns: 1 },
];

export {
  personalDebtsTableBreakpoints,
  personalDebtsTableTitles,
};
