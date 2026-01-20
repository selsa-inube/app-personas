import {
  MdAdd,
  MdOutlineAccountBalance,
  MdOutlineCreditScore,
  MdOutlineSavings,
} from "react-icons/md";

const savingsBox = (withRequestBtn: boolean) => ({
  title: "Ahorros",
  subtitle: "Resumen productos de ahorro",
  icon: <MdOutlineSavings />,
  navigateTo: "/my-savings",
  collapsing: { start: false, allow: true },
  button: withRequestBtn
    ? {
        label: "Solicitar ahorro",
        icon: <MdAdd />,
        path: "/savings",
      }
    : undefined,
});

const creditsBox = (withRequestBtn: boolean) => ({
  title: "Créditos",
  subtitle: "Resumen productos de crédito",
  icon: <MdOutlineAccountBalance />,
  navigateTo: "/my-credits",
  collapsing: { start: false, allow: true },
  button: withRequestBtn
    ? {
        label: "Solicitar crédito",
        icon: <MdAdd />,
        path: "/credits",
      }
    : undefined,
});

const cardsBox = (withRequestBtn: boolean) => ({
  title: "Tarjetas",
  subtitle: "Resumen tarjetas de crédito",
  icon: <MdOutlineCreditScore />,
  navigateTo: "/my-cards",
  collapsing: { start: false, allow: true },
  button: withRequestBtn
    ? {
        label: "Solicitar tarjeta",
        icon: <MdAdd />,
        path: "/cards",
      }
    : undefined,
});

export { cardsBox, creditsBox, savingsBox };
