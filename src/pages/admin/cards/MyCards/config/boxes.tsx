import { MdAdd, MdOutlineCreditScore } from "react-icons/md";

const myCards = (withRequestBtn: boolean) => ({
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

export { myCards };
