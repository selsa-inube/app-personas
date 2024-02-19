const familyGroupTableTitles = [
  {
    id: "identificationNumber",
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
  { breakpoint: "(min-width: 1229px)", totalColumns: 4 },
  { breakpoint: "(max-width: 1120px)", totalColumns: 3 },
  { breakpoint: "(max-width: 1020px)", totalColumns: 2 },
  { breakpoint: "(max-width: 899px)", totalColumns: 3 },
  { breakpoint: "(max-width: 590px)", totalColumns: 2 },
  { breakpoint: "(max-width: 460px)", totalColumns: 1 },
];

export { familyGroupTableBreakpoints, familyGroupTableTitles };
