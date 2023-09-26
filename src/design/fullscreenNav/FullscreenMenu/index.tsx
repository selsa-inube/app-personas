import { useAuth0 } from "@auth0/auth0-react";
import { INavigation } from "../types";
import { MdClose, MdLogout } from "react-icons/md";
import { Text } from "@design/data/Text";
import { NavLink } from "@design/navigation/NavLink";
import { OneSection } from "../OneSection";
import { MultiSections } from "../MultiSections";
import {
  StyledFullscreenNav,
  StyledCloseMenu,
  StyledSeparatorLine,
  StyledFooter,
} from "./styles";

interface FullscreenMenuProps {
  logoutPath: string;
  logoutTitle: string;
  navigation: INavigation;
  onClose: () => void;
}

function FullscreenMenu(props: FullscreenMenuProps) {
  const { logoutPath, logoutTitle, navigation, onClose } = props;
  const { logout } = useAuth0();

  function handleLogout() {
    logout();
  }

  const totalSections = Object.keys(navigation.sections).length;

  return (
    <StyledFullscreenNav>
      <StyledCloseMenu>
        <Text type="title" size="small" appearance="gray">
          {navigation.title}
        </Text>
        <MdClose onClick={onClose} />
      </StyledCloseMenu>
      {totalSections > 1 ? (
        <MultiSections navigation={navigation} onClose={onClose} />
      ) : (
        <OneSection navigation={navigation} onClose={onClose} />
      )}
      <StyledSeparatorLine />
      <NavLink
        key="logout"
        icon={<MdLogout />}
        path={logoutPath}
        onClick={handleLogout}
      >
        {logoutTitle}
      </NavLink>
      <StyledFooter>
        <Text type="label" size="medium" appearance="gray">
          ©2023 - Inube
        </Text>
      </StyledFooter>
    </StyledFullscreenNav>
  );
}

export { FullscreenMenu };
