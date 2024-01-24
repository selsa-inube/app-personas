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
const amortizationTableTitles = [
  {
    id: "paymentNumber",
    titleName: "N°",
    priority: 0,
  },
  {
    id: "date",
    titleName: "Fecha",
    priority: 1,
  },
  {
    id: "type",
    titleName: "Tipo",
    priority: 2,
  },
  {
    id: "capitalPayment",
    titleName: "Abono",
    priority: 3,
  },
  {
    id: "interest",
    titleName: "Interés",
    priority: 4,
  },
  {
    id: "others",
    titleName: "Otros",
    priority: 5,
  },
];

const amortizationTableBreakpoints = [
  { breakpoint: "(min-width: 1200px)", totalColumns: 6 },
  { breakpoint: "(max-width: 1100px)", totalColumns: 5 },
  { breakpoint: "(max-width: 900px)", totalColumns: 6 },
  { breakpoint: "(max-width: 800px)", totalColumns: 5 },
  { breakpoint: "(max-width: 680px)", totalColumns: 4 },
  { breakpoint: "(max-width: 550px)", totalColumns: 3 },
  { breakpoint: "(max-width: 430px)", totalColumns: 2 },
];

const movementsTableBreakpoints = [
  { breakpoint: "(min-width: 1229px)", totalColumns: 3 },
  { breakpoint: "(max-width: 1000px)", totalColumns: 3 },
  { breakpoint: "(max-width: 910px)", totalColumns: 2 },
  { breakpoint: "(max-width: 890px)", totalColumns: 3 },
  { breakpoint: "(max-width: 650px)", totalColumns: 2 },
  { breakpoint: "(max-width: 390px)", totalColumns: 1 },
];

export {
  amortizationTableBreakpoints,
  amortizationTableTitles,
  movementsTableBreakpoints,
  movementsTableTitles,
};
