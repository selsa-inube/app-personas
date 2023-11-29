const familyGroupTableTitles = [
  {
    id: "number",
    titleName: "Documento",
    priority: 1,
  },
  {
    id: "fullName",
    titleName: "Nombre",
    priority: 0,
  },
  {
    id: "relationship",
    titleName: "Parentesco",
    priority: 2,
  },
  {
    id: "email",
    titleName: "Correo",
    priority: 4,
  },
  {
    id: "cellPhone",
    titleName: "Celular",
    priority: 3,
  },
];

const familyGroupTableBreakpoints = [
  { breakpoint: "(min-width: 1229px)", totalColumns: 5 },
  { breakpoint: "(max-width: 1228px)", totalColumns: 4 },
  { breakpoint: "(max-width: 1020px)", totalColumns: 3 },
  { breakpoint: "(max-width: 900px)", totalColumns: 4 },
  { breakpoint: "(max-width: 860px)", totalColumns: 3 },
  { breakpoint: "(max-width: 670px)", totalColumns: 2 },
  { breakpoint: "(max-width: 500px)", totalColumns: 1 },
];

export { familyGroupTableBreakpoints, familyGroupTableTitles };
