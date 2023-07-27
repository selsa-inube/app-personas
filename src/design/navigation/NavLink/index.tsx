import { Text } from "../../data/Text";
import { Stack } from "../../layout/Stack";
import { Icon } from "../../data/Icon";

import { MdChevronRight } from "react-icons/md";

import { StyledNavLink, StyledLink } from "./styles";
import { useState } from "react";

interface NavLinkProps {
  icon: React.JSX.Element;
  children: React.JSX.Element;
  path?: string;
  selected?: boolean;
}

function NavLink(props: NavLinkProps) {
  const { icon, children, path = "", selected = false } = props;
  const [isHovered, setIsHovered] = useState(false);

  function toggleHover(state: boolean) {
    setIsHovered(state);
  }

  function getIconAppearance() {
    if (selected || isHovered) {
      return "primary";
    }
    return "dark";
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
            <Icon
              icon={icon}
              appearance={getIconAppearance()}
              parentHover={true}
            />
            <Text size="medium">{children}</Text>
          </Stack>
          {selected && <MdChevronRight size="24px" />}
        </Stack>
      </StyledLink>
    </StyledNavLink>
  );
}

export type { NavLinkProps };
export { NavLink };
