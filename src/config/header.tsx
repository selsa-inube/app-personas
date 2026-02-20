import { IFullscreenNav, IMenuSection } from "@inubekit/inubekit";
import {
  MdLogout,
  MdOutlineContactPage,
  MdOutlineManageAccounts,
} from "react-icons/md";

const getHeader = (
  nav: IFullscreenNav,
  logoURL: string,
) => {
  const consultingUser = sessionStorage.getItem("consultingUser");

  const businessUnit = consultingUser ? "Desarrollo" : "";

  return {
    logoURL: logoURL,
    username: "Fake",
    portalId: "portal",
    logoutTitle: "Cerrar sesión",
    navigation: nav,
    businessUnit,
  };
};

const getMenuSections = (
  isConsultingUser: boolean,
  updateDataAssistedFlag: boolean,
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
      divider: true,
    });
  }

  if (updateDataAssistedFlag) {
    sections.push({
      id: "update-data",
      links: [
        {
          id: "update-data",
          title: "Actualizar mis datos",
          iconBefore: <MdOutlineContactPage />,
          path: "/update-data-assisted",
        }
      ],
      divider: !isConsultingUser,
    })
  }

  sections.push({
    id: "logout",
    actions: [
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
