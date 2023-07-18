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
  collapsing: { allow: false },
  button: {
    label: "Solicitar ahorro",
    icon: <MdAdd />,
  },
};

const credits = {
  title: "Créditos",
  subtitle: "Consulta tus préstamos",
  icon: <MdOutlineAccountBalance />,
  collapsing: { allow: false },
  button: {
    label: "Solicitar crédito",
    icon: <MdAdd />,
  },
};

const cards = {
  title: "Tarjetas",
  subtitle: "Consulta tus compras",
  icon: <MdOutlineCreditScore />,
  collapsing: { allow: false },
  button: {
    label: "Solicitar tarjeta",
    icon: <MdAdd />,
  },
};

export { savings, credits, cards };
