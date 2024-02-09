const movementsTableTitles = [
  {
    id: "date",
    titleName: "Fecha",
    priority: 0,
  },
  {
    id: "reference",
    titleName: "Referencia",
    priority: 2,
  },
  {
    id: "description",
    titleName: "Descripción",
    priority: 1,
  },
];

const movementsTableBreakpoints = [
  { breakpoint: "(min-width: 1229px)", totalColumns: 3 },
  { breakpoint: "(max-width: 1070px)", totalColumns: 2 },
  { breakpoint: "(max-width: 920px)", totalColumns: 1 },
  { breakpoint: "(max-width: 895px)", totalColumns: 3 },
  { breakpoint: "(max-width: 820px)", totalColumns: 2 },
  { breakpoint: "(max-width: 670px)", totalColumns: 1 },
];

export { movementsTableBreakpoints, movementsTableTitles };
