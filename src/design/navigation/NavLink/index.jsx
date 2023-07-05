import PropTypes from "prop-types";

import { Text } from "../../data/Text";
import { Stack } from "../../layout/Stack";

import { MdChevronRight } from "react-icons/md";

import { StyledNavLink, StyledLink, StyledIcon } from "./styles";

function NavLink(props) {
  const { icon, children, path, isSelected } = props;

  return (
    <StyledNavLink isSelected={isSelected}>
      <StyledLink path={path}>
        <Stack width="100%" alignItems="center" justifyContent="space-between">
          <Stack alignItems="center" gap="24px">
            <StyledIcon isSelected={true}>{icon}</StyledIcon>
            <Text size="medium">{children}</Text>
          </Stack>
          <MdChevronRight size="24px" />
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
