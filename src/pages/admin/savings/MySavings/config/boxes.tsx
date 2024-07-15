import { MdAdd, MdOutlineSavings } from "react-icons/md";

const mySavingsBox = (withRequestBtn: boolean) => ({
  title: "Ahorros",
  subtitle: "Resumen productos de ahorros",
  icon: <MdOutlineSavings />,
  collapsing: { start: true, allow: false },
  button: withRequestBtn
    ? {
        label: "Solicitar ahorro",
        icon: <MdAdd />,
        path: "/savings",
      }
    : undefined,
});

export { mySavingsBox };
