import {
  MdAttachMoney,
  MdCurrencyExchange,
  MdHistory,
  MdOutlineAddHome,
  MdOutlineSupportAgent,
} from "react-icons/md";

const quickLinks = [
  {
    icon: <MdAttachMoney />,
    label: "Paga tus créditos",
    path: "/payments",
  },
  {
    icon: <MdCurrencyExchange />,
    label: "Transferir dinero",
    path: "/transfer",
  },
  {
    icon: <MdHistory />,
    label: "Mis pagos automáticos",
    path: "/debit",
  },
  {
    icon: <MdOutlineAddHome />,
    label: "Abrir CDT",
    path: "/cdt",
  },
  {
    icon: <MdOutlineSupportAgent />,
    label: "Atención en línea",
    path: "/support",
  },
];

export { quickLinks };
