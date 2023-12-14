import { MdLogout } from "react-icons/md";
import { Text } from "../../data/Text";
import { NavLink } from "../NavLink";

import { ISection } from "@design/layout/Page/types";
import { useAuth } from "@inube/auth";
import {
  StyledContent,
  StyledFooter,
  StyledList,
  StyledNav,
  StyledSeparatorLine,
} from "./styles";

interface NavProps {
  title?: string;
  sections: ISection[];
  currentLocation: string;
  logoutPath: string;
  logoutTitle: string;
}

function Nav(props: NavProps) {
  const {
    title = "Menu",
    sections,
    currentLocation,
    logoutPath,
    logoutTitle,
  } = props;
  const year = new Date().getFullYear();

  const { logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
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
              <Text padding="s200" type="title" size="small" appearance="gray">
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
          path={logoutPath}
          onClick={handleLogout}
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
  );
}

export { Nav };
export type { NavProps };
