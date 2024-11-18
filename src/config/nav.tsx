import { INav } from "@design/layout/Page/types";
import { INavAction, INavNavigation, INavSection } from "@inubekit/nav";
import {
  MdApproval,
  MdLogout,
  MdOutlineAccountBalance,
  MdOutlineAccountBalanceWallet,
  MdOutlineAssignment,
  MdOutlineAttachMoney,
  MdOutlineCompareArrows,
  MdOutlineCreditCard,
  MdOutlineHouse,
  MdOutlinePayments,
  MdOutlineSavings,
  MdOutlineSupport,
} from "react-icons/md";

const getMobileNav = (
  requestSavingFlag: boolean,
  requestCreditFlag: boolean,
  requestEventFlag: boolean,
  requestAidFlag: boolean,
  requestHolidaysFlag: boolean,
  requestTransfersFlag: boolean,
  requestPaymentsFlag: boolean,
  myRequestsFlag: boolean,
  myPQRSFlag: boolean,
  requestCertificationsFlag: boolean,
): INav => {
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
        ...(myRequestsFlag
          ? [
              {
                label: "Mis solicitudes",
                path: "/my-requests",
                icon: <MdOutlineAssignment />,
              },
            ]
          : []),
        ...(requestPaymentsFlag
          ? [
              {
                label: "Pagos",
                path: "/payments",
                icon: <MdOutlinePayments />,
              },
            ]
          : []),
        ...(requestTransfersFlag
          ? [
              {
                label: "Transferencias",
                path: "/transfers",
                icon: <MdOutlineCompareArrows />,
              },
            ]
          : []),
      ],
    },
  ];

  if (
    requestSavingFlag ||
    requestCreditFlag ||
    requestEventFlag ||
    requestAidFlag ||
    requestHolidaysFlag ||
    requestCertificationsFlag
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

    if (requestAidFlag) {
      sections[1].links.push({
        label: "Auxilios",
        path: "/aids",
        icon: <MdOutlineSupport />,
      });
    }

    if (requestCertificationsFlag) {
      sections[1].links.push({
        label: "Certificaciones",
        path: "/certifications",
        icon: <MdApproval />,
      });
    }
  }

  return {
    sections,
  };
};

const getNav = (
  requestSavingFlag: boolean,
  requestCreditFlag: boolean,
  requestEventFlag: boolean,
  requestAidFlag: boolean,
  requestHolidaysFlag: boolean,
  requestTransfersFlag: boolean,
  requestPaymentsFlag: boolean,
  myRequestsFlag: boolean,
  myPQRSFlag: boolean,
  requestCertificationsFlag: boolean,
): INavNavigation => {
  const sections: { [key: string]: INavSection } = {
    administrar: {
      name: "ADMINISTRAR",
      links: {},
    },
  };
  if (
    requestSavingFlag ||
    requestCreditFlag ||
    requestEventFlag ||
    requestAidFlag ||
    requestHolidaysFlag ||
    requestCertificationsFlag
  ) {
    sections.solicitar = {
      name: "SOLICITAR",
      links: {},
    };
  }

  sections.administrar.links["resumen"] = {
    id: "resumen",
    label: "Resumen",
    path: "/",
    icon: <MdOutlineHouse />,
  };

  sections.administrar.links["misAhorros"] = {
    id: "misAhorros",
    label: "Mis ahorros",
    path: "/my-savings",
    icon: <MdOutlineSavings />,
  };

  sections.administrar.links["misCreditos"] = {
    id: "misCreditos",
    label: "Mis créditos",
    path: "/my-credits",
    icon: <MdOutlineAccountBalance />,
  };

  sections.administrar.links["misTarjetas"] = {
    id: "misTarjetas",
    label: "Mis tarjetas",
    path: "/my-cards",
    icon: <MdOutlineCreditCard />,
  };

  if (myRequestsFlag) {
    sections.administrar.links["misSolicitudes"] = {
      id: "misSolicitudes",
      label: "Mis solicitudes",
      path: "/my-requests",
      icon: <MdOutlineAssignment />,
    };
  }

  if (requestPaymentsFlag) {
    sections.administrar.links["pagos"] = {
      id: "pagos",
      label: "Pagos",
      path: "/payments",
      icon: <MdOutlinePayments />,
    };
  }

  if (requestTransfersFlag) {
    sections.administrar.links["transferencias"] = {
      id: "transferencias",
      label: "Transferencias",
      path: "/transfers",
      icon: <MdOutlineCompareArrows />,
    };
  }

  if (
    requestSavingFlag ||
    requestCreditFlag ||
    requestEventFlag ||
    requestAidFlag ||
    requestHolidaysFlag ||
    requestCertificationsFlag
  ) {
    if (requestSavingFlag) {
      sections.solicitar.links["ahorros"] = {
        id: "ahorros",
        label: "Ahorros",
        path: "/savings",
        icon: <MdOutlineAccountBalanceWallet />,
      };
    }

    if (requestCreditFlag) {
      sections.solicitar.links["creditos"] = {
        id: "creditos",
        label: "Créditos",
        path: "/credits",
        icon: <MdOutlineAttachMoney />,
      };
    }

    if (requestAidFlag) {
      sections.solicitar.links["auxilios"] = {
        id: "auxilios",
        label: "Auxilios",
        path: "/aids",
        icon: <MdOutlineSupport />,
      };
    }

    if (requestCertificationsFlag) {
      sections.solicitar.links["certificaciones"] = {
        id: "certificaciones",
        label: "Certificaciones",
        path: "/certifications",
        icon: <MdApproval />,
      };
    }
  }

  return {
    title: "MENU",
    sections,
  };
};

const getActions = (handleToggleLogoutModal: () => void): INavAction[] => {
  return [
    {
      id: "logout",
      label: "Cerrar sesión",
      icon: <MdLogout />,
      action: handleToggleLogoutModal,
    },
  ];
};

export { getActions, getMobileNav, getNav };