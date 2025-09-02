import { IHeaderLink } from "@design/layout/Page/types";
import { IFullscreenNav, IMenuSection } from "@inubekit/inubekit";
import {
  MdLogout,
  MdOutlineBadge,
  MdOutlineContactSupport,
  MdOutlineManageAccounts,
} from "react-icons/md";

const getHeader = (
  updateDataAssistedFlag: boolean,
  withCreatePQRS: boolean,
  nav: IFullscreenNav,
  logoURL: string,
) => {
  const links: IHeaderLink[] = [];

  if (withCreatePQRS) {
    links.push({
      label: "Crear PQRS",
      path: "/my-pqrs/create",
      icon: <MdOutlineContactSupport />,
    });
  }

  if (updateDataAssistedFlag) {
    links.push({
      label: "Actualiza tus datos",
      path: "/update-data-assisted",
      icon: <MdOutlineBadge />,
    });
  }

  const consultingUser = sessionStorage.getItem("consultingUser");

  const businessUnit = consultingUser ? "Desarrollo" : "";

  return {
    logoURL: logoURL,
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
  installApp: () => void,
  onToggleLogoutModal: () => void,
): IMenuSection[] => {
  const sections: IMenuSection[] = [];

  if (isConsultingUser) {
    sections.push({
      id: "switch-user",
      links: [
        {
          id: "switch-user",
          title: "Cambiar cliente",
          iconBefore: <MdOutlineManageAccounts />,
          path: "/switch-user?redirect_to=/",
        },
      ],
    });
  }

  sections.push({
    id: "logout",
    actions: [
      {
        id: "install-app",
        title: "Instalar App",
        iconBefore: <MdOutlineManageAccounts />,
        action: installApp,
      },
      {
        id: "logout",
        title: "Cerrar sesión",
        iconBefore: <MdLogout />,
        action: onToggleLogoutModal,
      },
    ],
    divider: true,
  });

  return sections;
};

export { getHeader, getMenuSections };
