import {
  MdOutlineAccountBalance,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
  MdOutlineSavings,
} from "react-icons/md";

const quickLinks = [
  {
    icon: <MdOutlineSavings />,
    label: "Consultar ahorros",
    path: "/my-savings",
  },
  {
    icon: <MdOutlineAccountBalance />,
    label: "Consultar créditos",
    path: "/my-credits",
  },
  {
    icon: <MdOutlineCreditCard />,
    label: "Consultar tarjetas",
    path: "/my-cards",
  },
  {
    icon: <MdOutlineAttachMoney />,
    label: "Realizar pagos",
    path: "/payments",
  },
];

export { quickLinks };
