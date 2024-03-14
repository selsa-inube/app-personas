import { DecisionModal } from "@components/modals/DecisionModal";
import { Text } from "@design/data/Text";
import { INav } from "@design/layout/Page/types";
import { IHeaderLink } from "@design/navigation/Header/types";
import { NavLink } from "@design/navigation/NavLink";
import { useAuth } from "@inube/auth";
import { useState } from "react";
import { MdClose, MdLogout } from "react-icons/md";
import { MultiSections } from "../MultiSections";
import { OneSection } from "../OneSection";
import {
  StyledCloseMenu,
  StyledFooter,
  StyledFullscreenNav,
  StyledSeparatorLine,
} from "./styles";

const year = new Date().getFullYear();

interface FullscreenMenuProps {
  logoutTitle: string;
  navigation: INav;
  links?: IHeaderLink[];
  onClose: () => void;
}

function FullscreenMenu(props: FullscreenMenuProps) {
  const { logoutTitle, navigation, links, onClose } = props;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();

  const handleToggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
  };

  const totalSections = Object.keys(navigation.sections).length;

  return (
    <>
      <StyledFullscreenNav>
        <StyledCloseMenu>
          <Text type="title" size="small" appearance="gray">
            MENU
          </Text>
          <MdClose onClick={onClose} />
        </StyledCloseMenu>
        {totalSections > 1 ? (
          <MultiSections
            navigation={navigation}
            onClose={onClose}
            links={links}
          />
        ) : (
          <OneSection navigation={navigation} onClose={onClose} links={links} />
        )}
        <StyledSeparatorLine />
        <NavLink
          key="logout"
          icon={<MdLogout />}
          onClick={handleToggleLogoutModal}
        >
          {logoutTitle}
        </NavLink>
        <StyledFooter>
          <Text type="label" size="medium" appearance="gray">
            ©{year} - Inube
          </Text>
        </StyledFooter>
      </StyledFullscreenNav>
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

export { FullscreenMenu };
