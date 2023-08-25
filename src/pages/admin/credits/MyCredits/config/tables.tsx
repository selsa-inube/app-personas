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
    id: "capitalPayment",
    titleName: "Abono",
    priority: 2,
  },
  {
    id: "interest",
    titleName: "Interés",
    priority: 3,
  },
  {
    id: "others",
    titleName: "Otros",
    priority: 4,
  },
];

const amortizationTableBreakpoints = [
  { breakpoint: "(min-width: 900px)", totalColumns: 5 },
  { breakpoint: "(max-width: 700px)", totalColumns: 4 },
  { breakpoint: "(max-width: 600px)", totalColumns: 3 },
  { breakpoint: "(max-width: 430px)", totalColumns: 2 },
  { breakpoint: "(max-width: 330px)", totalColumns: 1 },
];

const movementsTableBreakpoints = [
  { breakpoint: "(min-width: 1229px)", totalColumns: 3 },
  { breakpoint: "(max-width: 1000px)", totalColumns: 3 },
  { breakpoint: "(max-width: 910px)", totalColumns: 2 },
  { breakpoint: "(max-width: 890px)", totalColumns: 3 },
  { breakpoint: "(max-width: 650px)", totalColumns: 2 },
  { breakpoint: "(max-width: 300px)", totalColumns: 1 },
];

export {
  movementsTableBreakpoints,
  movementsTableTitles,
  amortizationTableBreakpoints,
  amortizationTableTitles,
};
