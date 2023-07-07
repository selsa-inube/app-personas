import PropTypes from "prop-types";

import { Text } from "../../data/Text";
import { NavLink } from "../NavLink";

import { StyledNav, StyledContent, StyledFooter } from "./styles";

function Nav(props) {
  const { title = "Menu", sections, currentLocation } = props;
  const year = new Date().getFullYear();

  return (
    <StyledNav>
      <StyledContent>
        <Text
          padding="32px 16px 16px 16px"
          color="gray"
          type="title"
          size="small"
        >
          {title.toUpperCase()}
        </Text>
        {sections.map((section) => (
          <div key={section.title}>
            {sections.length > 1 && (
              <Text padding="16px" type="title" size="small" color="gray">
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
          </div>
        ))}
      </StyledContent>
      <StyledFooter>
        <Text type="label" size="medium" textAlign="center" padding="24px">
          © {year} Inube
        </Text>
      </StyledFooter>
    </StyledNav>
  );
}

Nav.propTypes = {
  title: PropTypes.string,
  sections: PropTypes.array.isRequired,
  currentLocation: PropTypes.string.isRequired,
};

export { Nav };
