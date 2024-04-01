import {
  MdOutlineAccountBalance,
  MdOutlineAccountBalanceWallet,
  MdOutlineAirplaneTicket,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
  MdOutlineHouse,
  MdOutlineSavings,
} from "react-icons/md";

const nav = {
  sections: [
    {
      title: "Administrar",
      links: [
        {
          label: "Resumen",
          path: "/",
          icon: <MdOutlineHouse />,
        },
        {
          label: "Mis ahorros",
          path: "/my-savings",
          icon: <MdOutlineSavings />,
        },
        {
          label: "Mis créditos",
          path: "/my-credits",
          icon: <MdOutlineAccountBalance />,
        },
        {
          label: "Mis tarjetas",
          path: "/my-cards",
          icon: <MdOutlineCreditCard />,
        },
        {
          label: "Pagos",
          path: "/payments",
          icon: <MdOutlineAttachMoney />,
        },
      ],
    },
    {
      title: "Solicitar",
      links: [
        {
          label: "Ahorros",
          path: "/savings",
          icon: <MdOutlineAccountBalanceWallet />,
        },
        {
          label: "Créditos",
          path: "/credit",
          icon: <MdOutlineAttachMoney />,
        },
        {
          label: "Eventos",
          path: "/events",
          icon: <MdOutlineSportsCricket />,
        },
        {
          label: "Vacaciones",
          path: "/holidays",
          icon: <MdOutlineAirplaneTicket />,
        },
      ],
    },
  ],
};

export { nav };
