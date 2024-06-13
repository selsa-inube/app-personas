import { ISection } from "@design/navigation/Menu/MenuSection/types";
import {
  MdLogout,
  MdOutlineBadge,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { getNav } from "./nav";

const getHeader = (
  updateDataAssistedFlag: boolean,
  updateDataUnassistedFlag: boolean,
  requestSavingFlag: boolean,
  requestCreditFlag: boolean,
  requestEventFlag: boolean,
  requestAidFlag: boolean,
  requestHolidaysFlag: boolean,
  requestRechargeFlag: boolean
) => {
  const links = [];

  if (updateDataAssistedFlag) {
    links.push({
      label: "Actualiza tus datos (Con)",
      path: "/update-data-assisted",
      icon: <MdOutlineBadge />,
    });
  }

  if (updateDataUnassistedFlag) {
    links.push({
      label: "Actualiza tus datos (Sin)",
      path: "/update-data-unassisted",
      icon: <MdOutlineBadge />,
    });
  }

  const consultingUser = sessionStorage.getItem("consultingUser");

  const businessUnit = consultingUser ? "Desarrollo" : "Fondecom";

  return {
    logoURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbrWOwST-34PyX9rqlHzqEjqunO1PcMzpHJVUIV-7lL4HJ7tcEeNHaj6Redj1lFAOr4Q&usqp=CAU",
    username: "Fake",
    links,
    portalId: "portal",
    logoutTitle: "Cerrar sesión",
    navigation: getNav(
      requestSavingFlag,
      requestCreditFlag,
      requestEventFlag,
      requestAidFlag,
      requestHolidaysFlag,
      requestRechargeFlag
    ),
    businessUnit,
  };
};

const getMenuSections = (
  isConsultingUser: boolean,
  onToggleLogoutModal: () => void,
  onToggleUserMenu: () => void,
): ISection[] => {
  const sections: ISection[] = [];

  if (isConsultingUser) {
    sections.push({
      links: [
        {
          title: "Cambiar cliente",
          iconBefore: <MdOutlineManageAccounts />,
          path: "/switch-user?redirect_to=/",
          onClick: onToggleUserMenu,
        },
      ],
    });
  }

  sections.push({
    links: [
      {
        title: "Cerrar sesión",
        iconBefore: <MdLogout />,
        onClick: onToggleLogoutModal,
      },
    ],
    divider: true,
  });

  return sections;
};

export { getHeader, getMenuSections };
