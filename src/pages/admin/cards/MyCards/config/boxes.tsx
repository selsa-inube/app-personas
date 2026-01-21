import { MdOutlineCreditScore } from "react-icons/md";

const myCards = () => ({
  title: "Tarjetas",
  subtitle: "Resumen tarjetas de crédito",
  icon: <MdOutlineCreditScore />,
  navigateTo: "/my-cards",
  collapsing: { start: false, allow: true }
});

export { myCards };
