import PropTypes from "prop-types";

import { Text } from "../../data/Text";
import { Stack } from "../../layout/Stack";

import { MdChevronRight } from "react-icons/md";

import { StyledNavLink, StyledLink, StyledIcon } from "./styles";
import { useState } from "react";

function NavLink(props) {
  const { icon, children, path, isSelected = false } = props;
  const [isHovered, setIsHovered] = useState(false);

  function toggleHover(state) {
    setIsHovered(state);
  }

  return (
    <StyledNavLink
      isSelected={isSelected}
      onMouseOver={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      <StyledLink path={path} isSelected={isSelected}>
        <Stack width="100%" alignItems="center" justifyContent="space-between">
          <Stack alignItems="center" gap="24px">
            <StyledIcon isSelected={isSelected} isHovered={isHovered}>
              {icon}
            </StyledIcon>
            <Text size="medium">{children}</Text>
          </Stack>
          {isSelected && <MdChevronRight size="24px" />}
        </Stack>
      </StyledLink>
    </StyledNavLink>
  );
}

NavLink.propTypes = {
  icon: PropTypes.element.isRequired,
  children: PropTypes.string.isRequired,
  path: PropTypes.string,
  isSelected: PropTypes.bool,
};

export { NavLink };
