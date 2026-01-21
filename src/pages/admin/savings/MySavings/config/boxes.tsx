import { MdOutlineSavings } from "react-icons/md";

const mySavingsBox = () => ({
  title: "Ahorros",
  subtitle: "Resumen productos de ahorros",
  icon: <MdOutlineSavings />,
  collapsing: { start: true, allow: false }
});

export { mySavingsBox };
