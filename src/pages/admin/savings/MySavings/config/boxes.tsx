import { MdAccountBalanceWallet, MdAdd } from "react-icons/md";

const mySavings = {
  title: "Ahorros",
  subtitle: "Resumen productos de ahorros",
  icon: <MdAccountBalanceWallet />,
  collapsing: { start: false, allow: false },
  button: {
    label: "Solicitar ahorro",
    icon: <MdAdd />,
    path: "/savings",
  },
};

export { mySavings };
