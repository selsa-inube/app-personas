import {
  MdAdd,
  MdOutlineAccountBalance,
  MdOutlineCreditScore,
  MdOutlineSavings,
} from "react-icons/md";

const savingsBox = {
  title: "Ahorros",
  subtitle: "Resumen productos de ahorro",
  icon: <MdOutlineSavings />,
  navigateTo: "/my-savings",
  collapsing: { start: false, allow: true },
  button: {
    label: "Solicitar ahorro",
    icon: <MdAdd />,
    path: "/savings",
  },
};

const creditsBox = {
  title: "Créditos",
  subtitle: "Resumen productos de crédito",
  icon: <MdOutlineAccountBalance />,
  navigateTo: "/my-credits",
  collapsing: { start: false, allow: true },
  button: {
    label: "Solicitar crédito",
    icon: <MdAdd />,
    path: "/credit",
  },
};

const cardsBox = {
  title: "Tarjetas de crédito",
  subtitle: "Resumen tarjetas de crédito",
  icon: <MdOutlineCreditScore />,
  navigateTo: "/my-cards",
  collapsing: { start: false, allow: true },
  button: {
    label: "Solicitar tarjeta",
    icon: <MdAdd />,
    path: "/cards",
  },
};

export { cardsBox, creditsBox, savingsBox };
