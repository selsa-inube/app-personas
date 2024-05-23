import { MdAdd, MdOutlineAccountBalance } from "react-icons/md";

const myCredits = {
  title: "Créditos",
  subtitle: "Resumen productos de crédito",
  icon: <MdOutlineAccountBalance />,
  collapsing: { start: true, allow: false },
  button: {
    label: "Solicitar crédito",
    icon: <MdAdd />,
    path: "/credits",
  },
};

export { myCredits };
