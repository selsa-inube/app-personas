import { MdOutlineAssignment, MdOutlineAttachMoney } from "react-icons/md";

const creditBox = {
  icon: <MdOutlineAttachMoney size={34} />,
  collapsing: { start: true, allow: true },
  button: {
    label: "Plan de pagos",
    icon: <MdOutlineAssignment />,
    path: "/",
  },
};

const creditTableTitles = [
  {
    id: "date",
    titleName: "Fecha",
    priority: 1,
  },
  {
    id: "reference",
    titleName: "Referencia",
    priority: 0,
  },
  {
    id: "description",
    titleName: "Descripción",
    priority: 2,
  },
];

const creditTableBreakpoints = [
  { breakpoint: "(min-width: 1229px)", totalColumns: 3 },
  { breakpoint: "(max-width: 1000px)", totalColumns: 3 },
  { breakpoint: "(max-width: 910px)", totalColumns: 2 },
  { breakpoint: "(max-width: 890px)", totalColumns: 3 },
  { breakpoint: "(max-width: 650px)", totalColumns: 2 },
  { breakpoint: "(max-width: 506px)", totalColumns: 2 },
  { breakpoint: "(max-width: 416px)", totalColumns: 1 },
];

export { creditBox, creditTableBreakpoints, creditTableTitles };
