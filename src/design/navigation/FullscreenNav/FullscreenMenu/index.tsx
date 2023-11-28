import { useAuth0 } from "@auth0/auth0-react";
import { Text } from "@design/data/Text";
import { INav } from "@design/layout/Page/types";
import { IHeaderLink } from "@design/navigation/Header/types";
import { NavLink } from "@design/navigation/NavLink";
import { MdClose, MdLogout } from "react-icons/md";
import { MultiSections } from "../MultiSections";
import { OneSection } from "../OneSection";
import {
  StyledCloseMenu,
  StyledFooter,
  StyledFullscreenNav,
  StyledSeparatorLine,
} from "./styles";

interface FullscreenMenuProps {
  logoutPath: string;
  logoutTitle: string;
  navigation: INav;
  links?: IHeaderLink[];
  onClose: () => void;
}

function FullscreenMenu(props: FullscreenMenuProps) {
  const { logoutPath, logoutTitle, navigation, links, onClose } = props;
  const { logout } = useAuth0();

  function handleLogout() {
    logout();
  }

  const totalSections = Object.keys(navigation.sections).length;

  return (
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
