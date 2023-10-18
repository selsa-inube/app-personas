import {
  MdAdd,
  MdOutlineAccountBalance,
  MdOutlineAdd,
  MdOutlineBalance,
  MdOutlineCreditScore,
  MdOutlineSavings,
} from "react-icons/md";

const savings = {
  title: "Ahorros",
  subtitle: "Resumen productos de ahorro",
  icon: <MdOutlineSavings />,
  navigateTo: "/my-savings",
  collapsing: { start: false, allow: false },
  button: {
    label: "Solicitar ahorro",
    icon: <MdAdd />,
    path: "/savings",
  },
};

const credits = {
  title: "Créditos",
  subtitle: "Consulta tus préstamos",
  icon: <MdOutlineAccountBalance />,
  navigateTo: "/my-credits",
  collapsing: { start: false, allow: false },
  button: {
    label: "Solicitar crédito",
    icon: <MdAdd />,
    path: "/credit",
  },
};

const cards = {
  title: "Tarjetas",
  subtitle: "Consulta tus compras",
  icon: <MdOutlineCreditScore />,
  collapsing: { start: false, allow: false },
  button: {
    label: "Solicitar tarjeta",
    icon: <MdAdd />,
    path: "/cards",
  },
};

export { cards, credits, savings };
