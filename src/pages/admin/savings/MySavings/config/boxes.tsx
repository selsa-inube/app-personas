import { MdAdd, MdOutlineSavings } from "react-icons/md";

const mySavingsBox = {
  title: "Ahorros",
  subtitle: "Resumen productos de ahorros",
  icon: <MdOutlineSavings />,
  collapsing: { start: false, allow: false },
  button: {
    label: "Solicitar ahorro",
    icon: <MdAdd />,
    path: "/savings",
  },
};

export { mySavingsBox };
