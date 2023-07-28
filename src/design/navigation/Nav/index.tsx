import { Text } from "../../data/Text";
import { NavLink } from "../NavLink";

import { StyledNav, StyledList, StyledContent, StyledFooter } from "./styles";
import { ISections } from "@design/layout/Page/types";

interface NavProps {
  title?: string;
  sections: ISections[];
  currentLocation: string;
}

function Nav(props: NavProps) {
  const { title = "Menu", sections, currentLocation } = props;
  const year = new Date().getFullYear();

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
                selected={link.path === currentLocation ? true : false}
              >
                {link.label}
              </NavLink>
            ))}
          </StyledList>
        ))}
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
