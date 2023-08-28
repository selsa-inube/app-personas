import { MdOutlineAdd, MdOutlineBalance } from "react-icons/md";

const myInvestments  = {
  title: "Inversiones",
  subtitle: "Resumen productos de inversión",
  icon: <MdOutlineBalance />,
  collapsing: { start: false, allow: false },
  button: {
    label: "Solicitar CDAT",
    icon: <MdOutlineAdd />,
    path: "/my-investments",
  },
};

export { myInvestments };