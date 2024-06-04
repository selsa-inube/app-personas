import {
  MdOutlineAccountBalance,
  MdOutlineAccountBalanceWallet,
  MdOutlineAirplaneTicket,
  MdOutlineAttachMoney,
  MdOutlineCompareArrows,
  MdOutlineCreditCard,
  MdOutlineHouse,
  MdOutlinePayments,
  MdOutlineSavings,
  MdOutlineStarBorder,
  MdOutlineSupport,
} from "react-icons/md";

const getNav = (
  requestSavingFlag: boolean,
  requestCreditFlag: boolean,
  requestEventFlag: boolean,
  requestAidFlag: boolean,
  requestHolidaysFlag: boolean,
) => {
  const sections = [
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
          icon: <MdOutlinePayments />,
        },
        {
          label: "Transferencias",
          path: "/transfers",
          icon: <MdOutlineCompareArrows />,
        },
        {
          label: "Transferencias",
          path: "/transfers",
          icon: <MdOutlineCompareArrows />,
        },
      ],
    },
  ];

  if (
    requestSavingFlag ||
    requestCreditFlag ||
    requestEventFlag ||
    requestAidFlag ||
    requestHolidaysFlag
  ) {
    sections.push({
      title: "Solicitar",
      links: [],
    });

    if (requestSavingFlag) {
      sections[1].links.push({
        label: "Ahorros",
        path: "/savings",
        icon: <MdOutlineAccountBalanceWallet />,
      });
    }

    if (requestCreditFlag) {
      sections[1].links.push({
        label: "Créditos",
        path: "/credits",
        icon: <MdOutlineAttachMoney />,
      });
    }

    if (requestEventFlag) {
      sections[1].links.push({
        label: "Eventos",
        path: "/events",
        icon: <MdOutlineStarBorder />,
      });
    }

    if (requestAidFlag) {
      sections[1].links.push({
        label: "Auxilios",
        path: "/aids",
        icon: <MdOutlineSupport />,
      });
    }

    if (requestHolidaysFlag) {
      sections[1].links.push({
        label: "Vacaciones",
        path: "/holidays",
        icon: <MdOutlineAirplaneTicket />,
      });
    }
  }

  return {
    sections,
  };
};

export { getNav };
