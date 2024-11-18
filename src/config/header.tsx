import { INav } from "@design/layout/Page/types";
import { ISection } from "@design/navigation/Menu/MenuSection/types";
import {
  MdLogout,
  MdOutlineBadge,
  MdOutlineManageAccounts,
} from "react-icons/md";

const logoUrl =
  "https://res.cloudinary.com/wfercanas/image/upload/v1729119253/linpar/selsa_jybzim.png";

const getHeader = (
  updateDataAssistedFlag: boolean,
  updateDataUnassistedFlag: boolean,
  createPQRS: boolean,
  nav: INav,
) => {
  const links = [];

  if (updateDataAssistedFlag) {
    links.push({
      label: "Actualiza tus datos",
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

  const businessUnit = consultingUser ? "Desarrollo" : "";

  return {
    logoURL: logoUrl,
    username: "Fake",
    links,
    portalId: "portal",
    logoutTitle: "Cerrar sesión",
    navigation: nav,
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

export { getHeader, getMenuSections, logoUrl };
