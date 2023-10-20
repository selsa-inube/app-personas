import {
  MdAdd,
  MdOutlineAccountBalance,
  MdOutlineCreditScore,
  MdOutlineSavings,
} from "react-icons/md";

const savings = {
  title: "Ahorros",
  subtitle: "Resumen productos de ahorro",
  icon: <MdOutlineSavings />,
  navigateTo: "/my-savings",
  collapsing: { start: true, allow: true },
  button: {
    label: "Solicitar ahorro",
    icon: <MdAdd />,
    path: "/savings",
  },
};

const credits = {
  title: "Créditos",
  subtitle: "Resumen productos de crédito",
  icon: <MdOutlineAccountBalance />,
  navigateTo: "/my-credits",
  collapsing: { start: true, allow: true },
  button: {
    label: "Solicitar crédito",
    icon: <MdAdd />,
    path: "/credit",
  },
};

const cards = {
  title: "Tarjetas de crédito",
  subtitle: "Resumen tarjetas de crédito",
  icon: <MdOutlineCreditScore />,
  collapsing: { start: true, allow: true },
  button: {
    label: "Solicitar tarjeta",
    icon: <MdAdd />,
    path: "/cards",
  },
};

export { cards, credits, savings };
