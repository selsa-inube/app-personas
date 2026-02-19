import {
  IFullscreenNav,
  IFullscreenNavSection,
  INavAction,
  INavNavigation,
  INavSection,
} from "@inubekit/inubekit";
import {
  MdApproval,
  MdLogout,
  MdOutlineAccountBalance,
  MdOutlineAccountBalanceWallet,
  MdOutlineAirplaneTicket,
  MdOutlineAssignment,
  MdOutlineAttachMoney,
  MdOutlineCompareArrows,
  MdOutlineConfirmationNumber,
  MdOutlineContactSupport,
  MdOutlineCreditCard,
  MdOutlineEvent,
  MdOutlineHouse,
  MdOutlineLocalActivity,
  MdOutlineManageAccounts,
  MdOutlinePayments,
  MdOutlineSavings,
  MdOutlineSupport,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { useLocation } from "react-router";

const useNav = (
  myCardsFlag: boolean,
  requestSavingFlag: boolean,
  requestCreditFlag: boolean,
  requestEventFlag: boolean,
  requestTicketFlag: boolean,
  requestAidFlag: boolean,
  requestHolidaysFlag: boolean,
  requestTransfersFlag: boolean,
  requestPaymentsFlag: boolean,
  myRequestsFlag: boolean,
  myPQRSFlag: boolean,
  myEntriesFlag: boolean,
  requestCertificationsFlag: boolean,
  requestCreatePQRSFlag: boolean,
): INavNavigation => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isLinkActive = (path: string, excludePaths: string[] = []) => {
    if (path === "/") return currentPath === path;

    if (currentPath === path) return true;

    const isExcluded = excludePaths.some((excluded) => currentPath === excluded || currentPath.startsWith(excluded + "/"));

    if (isExcluded) return false;

    return currentPath.startsWith(path + "/");
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
    requestTicketFlag ||
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
      isActive: isLinkActive("/my-pqrs", ["/my-pqrs/create"]),
    };
  }

  if (myEntriesFlag) {
    sections.administrar.links["misEntradas"] = {
      id: "misEntradas",
      label: "Mis entradas",
      path: "/my-entries",
      icon: <MdOutlineLocalActivity />,
      isActive: isLinkActive("/my-entries"),
    };
  }

  if (
    requestSavingFlag ||
    requestCreditFlag ||
    requestEventFlag ||
    requestTicketFlag ||
    requestAidFlag ||
    requestHolidaysFlag ||
    requestCertificationsFlag ||
    requestCreatePQRSFlag
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
        icon: <MdOutlineEvent />,
        isActive: isLinkActive("/events"),
      };
    }

    if (requestTicketFlag) {
      sections.solicitar.links["boleteria"] = {
        id: "boleteria",
        label: "Boletería",
        path: "/tickets",
        icon: <MdOutlineConfirmationNumber />,
        isActive: isLinkActive("/tickets"),
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

    if (requestCreatePQRSFlag) {
      sections.solicitar.links["pqrs-create"] = {
        id: "pqrs-create",
        label: "PQRS",
        path: "/my-pqrs/create",
        icon: <MdOutlineSupportAgent />,
        isActive: isLinkActive("/my-pqrs/create"),
      };
    }
  }

  return {
    title: "MENU",
    sections,
  };
};

const getActions = (updateDataFlag: boolean, handleUpdateData: () => void, handleToggleLogoutModal: () => void): INavAction[] => {
  const actions: INavAction[] = [];

  if (updateDataFlag) {
    actions.push({
      id: "update-data",
      label: "Actualizar mis datos",
      icon: <MdOutlineManageAccounts />,
      action: handleUpdateData,
    });
  }

  actions.push({
    id: "logout",
    label: "Cerrar sesión",
    icon: <MdLogout />,
    action: handleToggleLogoutModal,
  });

  return actions;
};

const getMobileNav = (
  myCardsFlag: boolean,
  requestSavingFlag: boolean,
  requestCreditFlag: boolean,
  requestEventFlag: boolean,
  requestTicketFlag: boolean,
  requestAidFlag: boolean,
  requestHolidaysFlag: boolean,
  requestTransfersFlag: boolean,
  requestPaymentsFlag: boolean,
  myRequestsFlag: boolean,
  myPQRSFlag: boolean,
  myEntriesFlag: boolean,
  requestCertificationsFlag: boolean,
  requestCreatePQRSFlag: boolean,
  updateDataAssistedFlag: boolean,
  handleUpdateData: () => void,
  handleToggleLogoutModal: () => void,
): IFullscreenNav => {
  const sections: IFullscreenNavSection[] = [
    {
      subtitle: "Administrar",
      collapse: false,
      links: [
        {
          id: "resume",
          label: "Resumen",
          path: "/",
          icon: <MdOutlineHouse />,
        },
        {
          id: "my-savings",
          label: "Mis ahorros",
          path: "/my-savings",
          icon: <MdOutlineSavings />,
        },
        {
          id: "my-credits",
          label: "Mis créditos",
          path: "/my-credits",
          icon: <MdOutlineAccountBalance />,
        },
        ...(myCardsFlag
          ? [
            {
              id: "my-cards",
              label: "Mis tarjetas",
              path: "/my-cards",
              icon: <MdOutlineCreditCard />,
            },
          ]
          : []),
        ...(myRequestsFlag
          ? [
            {
              id: "my-requests",
              label: "Mis solicitudes",
              path: "/my-requests",
              icon: <MdOutlineAssignment />,
            },
          ]
          : []),
        ...(requestPaymentsFlag
          ? [
            {
              id: "payments",
              label: "Pagos",
              path: "/payments",
              icon: <MdOutlinePayments />,
            },
          ]
          : []),
        ...(requestTransfersFlag
          ? [
            {
              id: "transfers",
              label: "Transferencias",
              path: "/transfers",
              icon: <MdOutlineCompareArrows />,
            },
          ]
          : []),
        ...(myPQRSFlag
          ? [
            {
              id: "my-pqrs",
              label: "Mis PQRS",
              path: "/my-pqrs",
              icon: <MdOutlineContactSupport />,
            },
          ]
          : []),
        ...(myEntriesFlag
          ? [
            {
              id: "my-entries",
              label: "Mis entradas",
              path: "/my-entries",
              icon: <MdOutlineLocalActivity />,
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
    requestTicketFlag ||
    requestAidFlag ||
    requestHolidaysFlag ||
    requestCertificationsFlag ||
    requestCreatePQRSFlag
  ) {
    sections.push({
      subtitle: "Solicitar",
      links: [],
    });

    if (requestSavingFlag) {
      sections[1].links.push({
        id: "savings",
        label: "Ahorros",
        path: "/savings",
        icon: <MdOutlineAccountBalanceWallet />,
      });
    }

    if (requestCreditFlag) {
      sections[1].links.push({
        id: "credits",
        label: "Créditos",
        path: "/credits",
        icon: <MdOutlineAttachMoney />,
      });
    }

    if (requestEventFlag) {
      sections[1].links.push({
        id: "events",
        label: "Eventos",
        path: "/events",
        icon: <MdOutlineEvent />,
      });
    }

    if (requestTicketFlag) {
      sections[1].links.push({
        id: "tickets",
        label: "Boletería",
        path: "/tickets",
        icon: <MdOutlineConfirmationNumber />,
      });
    }

    if (requestAidFlag) {
      sections[1].links.push({
        id: "aids",
        label: "Auxilios",
        path: "/aids",
        icon: <MdOutlineSupport />,
      });
    }

    if (requestHolidaysFlag) {
      sections[1].links.push({
        id: "holidays",
        label: "Vacaciones",
        path: "/holidays",
        icon: <MdOutlineAirplaneTicket />,
      });
    }

    if (requestCertificationsFlag) {
      sections[1].links.push({
        id: "certifications",
        label: "Certificaciones",
        path: "/certifications",
        icon: <MdApproval />,
      });
    }

    if (requestCreatePQRSFlag) {
      sections[1].links.push({
        id: "pqrs",
        label: "PQRS",
        path: "/my-pqrs/create",
        icon: <MdOutlineSupportAgent />,
      });
    }
  }

  const year = new Date().getFullYear();

  return {
    title: "MENU",
    sections,
    reactPortalId: "portal",
    displaySubtitles: true,
    collapse: true,
    footerLabel: `©${year} - Inube`,
    actions: getActions(updateDataAssistedFlag, handleUpdateData, handleToggleLogoutModal),
  };
};

export { getActions, getMobileNav, useNav };
