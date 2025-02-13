import { useLocation } from "react-router-dom";
import { INav } from "@design/layout/Page/types";
import { INavAction, INavNavigation, INavSection } from "@inubekit/inubekit";
import {
  MdApproval,
  MdLogout,
  MdOutlineAccountBalance,
  MdOutlineAccountBalanceWallet,
  MdOutlineAirplaneTicket,
  MdOutlineAssignment,
  MdOutlineAttachMoney,
  MdOutlineCompareArrows,
  MdOutlineContactSupport,
  MdOutlineCreditCard,
  MdOutlineHouse,
  MdOutlinePayments,
  MdOutlineSavings,
  MdOutlineStarBorder,
  MdOutlineSupport,
} from "react-icons/md";

const getMobileNav = (
  myCardsFlag: boolean,
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
        ...(myCardsFlag
          ? [
              {
                label: "Mis tarjetas",
                path: "/my-cards",
                icon: <MdOutlineCreditCard />,
              },
            ]
          : []),
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
        ...(myPQRSFlag
          ? [
              {
                label: "Mis PQRS",
                path: "/my-pqrs",
                icon: <MdOutlineContactSupport />,
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

const useNav = (
  myCardsFlag: boolean,
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
  const location = useLocation();
  const currentPath = location.pathname;

  const isLinkActive = (path: string) => {
    if (path === "/") return currentPath === path;
    return currentPath.startsWith(path);
  };

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
    isActive: isLinkActive("/"),
  };

  sections.administrar.links["misAhorros"] = {
    id: "misAhorros",
    label: "Mis ahorros",
    path: "/my-savings",
    icon: <MdOutlineSavings />,
    isActive: isLinkActive("/my-savings"),
  };

  sections.administrar.links["misCreditos"] = {
    id: "misCreditos",
    label: "Mis créditos",
    path: "/my-credits",
    icon: <MdOutlineAccountBalance />,
    isActive: isLinkActive("/my-credits"),
  };

  if (myCardsFlag) {
    sections.administrar.links["misTarjetas"] = {
      id: "misTarjetas",
      label: "Mis tarjetas",
      path: "/my-cards",
      icon: <MdOutlineCreditCard />,
      isActive: isLinkActive("/my-cards"),
    };
  }

  if (myRequestsFlag) {
    sections.administrar.links["misSolicitudes"] = {
      id: "misSolicitudes",
      label: "Mis solicitudes",
      path: "/my-requests",
      icon: <MdOutlineAssignment />,
      isActive: isLinkActive("/my-requests"),
    };
  }

  if (requestPaymentsFlag) {
    sections.administrar.links["pagos"] = {
      id: "pagos",
      label: "Pagos",
      path: "/payments",
      icon: <MdOutlinePayments />,
      isActive: isLinkActive("/payments"),
    };
  }

  if (requestTransfersFlag) {
    sections.administrar.links["transferencias"] = {
      id: "transferencias",
      label: "Transferencias",
      path: "/transfers",
      icon: <MdOutlineCompareArrows />,
      isActive: isLinkActive("/transfers"),
    };
  }

  if (myPQRSFlag) {
    sections.administrar.links["misPQRS"] = {
      id: "misPQRS",
      label: "Mis PQRS",
      path: "/my-pqrs",
      icon: <MdOutlineContactSupport />,
      isActive: isLinkActive("/my-pqrs"),
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
        isActive: isLinkActive("/savings"),
      };
    }

    if (requestCreditFlag) {
      sections.solicitar.links["creditos"] = {
        id: "creditos",
        label: "Créditos",
        path: "/credits",
        icon: <MdOutlineAttachMoney />,
        isActive: isLinkActive("/credits"),
      };
    }

    if (requestEventFlag) {
      sections.solicitar.links["eventos"] = {
        id: "eventos",
        label: "Eventos",
        path: "/events",
        icon: <MdOutlineStarBorder />,
        isActive: isLinkActive("/events"),
      };
    }

    if (requestAidFlag) {
      sections.solicitar.links["auxilios"] = {
        id: "auxilios",
        label: "Auxilios",
        path: "/aids",
        icon: <MdOutlineSupport />,
        isActive: isLinkActive("/aids"),
      };
    }

    if (requestHolidaysFlag) {
      sections.solicitar.links["vacaciones"] = {
        id: "vacaciones",
        label: "Vacaciones",
        path: "/holidays",
        icon: <MdOutlineAirplaneTicket />,
        isActive: isLinkActive("/holidays"),
      };
    }

    if (requestCertificationsFlag) {
      sections.solicitar.links["certificaciones"] = {
        id: "certificaciones",
        label: "Certificaciones",
        path: "/certifications",
        icon: <MdApproval />,
        isActive: isLinkActive("/certifications"),
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

export { getActions, getMobileNav, useNav };