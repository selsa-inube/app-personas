import { MdAdd, MdOutlineAccountBalance } from "react-icons/md";

const myCredits = (withRequestBtn: boolean) => ({
  title: "Créditos",
  subtitle: "Resumen productos de crédito",
  icon: <MdOutlineAccountBalance />,
  collapsing: { start: true, allow: false },
  button: withRequestBtn
    ? {
        label: "Solicitar crédito",
        icon: <MdAdd />,
        path: "/credits",
      }
    : undefined,
});

export { myCredits };
