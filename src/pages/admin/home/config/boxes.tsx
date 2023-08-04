import {
  MdAdd,
  MdOutlineAccountBalance,
  MdOutlineCreditScore,
  MdOutlineSavings,
} from "react-icons/md";

const savings = {
  title: "Ahorros",
  subtitle: "Consulta tus cuentas",
  icon: <MdOutlineSavings />,
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
