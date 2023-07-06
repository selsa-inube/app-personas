import PropTypes from "prop-types";

import { Text } from "../../data/Text";
import { Stack } from "../../layout/Stack";

import { MdChevronRight } from "react-icons/md";

import { StyledNavLink, StyledLink, StyledIcon } from "./styles";
import { useState } from "react";

function NavLink(props) {
  const { icon, children, path, selected = false } = props;
  const [isHovered, setIsHovered] = useState(false);

  function toggleHover(state) {
    setIsHovered(state);
  }

  return (
    <StyledNavLink
      selected={selected}
      onMouseOver={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      <StyledLink to={path} selected={selected}>
        <Stack width="100%" alignItems="center" justifyContent="space-between">
          <Stack alignItems="center" gap="24px">
            <StyledIcon selected={selected} isHovered={isHovered}>
              {icon}
            </StyledIcon>
            <Text size="medium">{children}</Text>
          </Stack>
          {selected && <MdChevronRight size="24px" />}
        </Stack>
      </StyledLink>
    </StyledNavLink>
  );
}

NavLink.propTypes = {
  icon: PropTypes.element.isRequired,
  children: PropTypes.string.isRequired,
  path: PropTypes.string,
  selected: PropTypes.bool,
};

export { NavLink };
