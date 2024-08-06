import { MdLogout } from "react-icons/md";
import { NavLink } from "../NavLink";

import { DecisionModal } from "@components/modals/general/DecisionModal";
import { ISection } from "@design/layout/Page/types";
import { useAuth } from "@inube/auth";
import { useState } from "react";
import {
  StyledContent,
  StyledFooter,
  StyledList,
  StyledNav,
  StyledSeparatorLine,
} from "./styles";
import { Text } from "@inubekit/text";
import { inube } from "@design/tokens";

const year = new Date().getFullYear();

interface NavProps {
  title?: string;
  sections: ISection[];
  currentLocation: string;
  logoutTitle: string;
}

function Nav(props: NavProps) {
  const { title = "Menu", sections, currentLocation, logoutTitle } = props;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();

  const handleToggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
  };

  return (
    <>
      <StyledNav>
        <StyledContent>
          <Text
            padding="32px 16px 16px 16px"
            appearance="gray"
            type="title"
            size="small"
          >
            {title.toUpperCase()}
          </Text>
          {sections.map((section) => (
            <StyledList key={section.title}>
              {sections.length > 1 && (
                <Text
                  padding={inube.spacing.s200}
                  type="title"
                  size="small"
                  appearance="gray"
                >
                  {section.title.toUpperCase()}
                </Text>
              )}
              {section.links.map((link) => (
                <NavLink
                  key={link.label}
                  path={link.path}
                  icon={link.icon}
                  selected={
                    currentLocation === link.path ||
                    currentLocation.startsWith(link.path + "/")
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </StyledList>
          ))}
          <StyledSeparatorLine />
          <NavLink
            key="logout"
            icon={<MdLogout />}
            onClick={handleToggleLogoutModal}
          >
            {logoutTitle}
          </NavLink>
        </StyledContent>
        <StyledFooter>
          <Text type="label" size="medium" textAlign="center" padding="s300">
            © {year} Inube
          </Text>
        </StyledFooter>
      </StyledNav>

      {showLogoutModal && (
        <DecisionModal
          title="Cerrar sesión"
          description="¿Realmente quieres cerrar sesión?"
          actionText="Cerrar sesión"
          portalId="modals"
          onCloseModal={handleToggleLogoutModal}
          onClick={handleLogout}
        />
      )}
    </>
  );
}

export { Nav };
export type { NavProps };
