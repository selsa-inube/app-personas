import {
  MdOutlineAccountBalance,
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
  MdOutlineCreditCard,
  MdOutlineHouse,
  MdOutlineSavings,
  MdOutlineStarBorder,
  MdOutlineSupport,
} from "react-icons/md";

const getNav = (
  requestSavingFlag: boolean,
  requestCreditFlag: boolean,
  requestEventFlag: boolean,
  requestAidFlag: boolean,
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
          icon: <MdOutlineAttachMoney />,
        },
      ],
    },
  ];

  if (
    requestSavingFlag ||
    requestCreditFlag ||
    requestEventFlag ||
    requestAidFlag
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
        path: "/credit",
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
  }

  return {
    sections,
  };
};

export { getNav };
