import { Icon } from "../../data/Icon";
import { Text } from "../../data/Text";
import { Stack } from "../../layout/Stack";

import { MdChevronRight } from "react-icons/md";

import { StyledLink, StyledNavLink } from "./styles";

interface NavLinkProps {
  icon: React.JSX.Element;
  children: React.ReactNode;
  path?: string;
  selected?: boolean;
}

function NavLink(props: NavLinkProps) {
  const { icon, children, path = "", selected = false } = props;

  function getIconAppearance() {
    if (selected) {
      return "primary";
    }
    return "dark";
  }

  return (
    <StyledNavLink selected={selected}>
      <StyledLink to={path} selected={selected}>
        <Stack width="100%" alignItems="center" justifyContent="space-between">
          <Stack alignItems="center" gap="24px">
            <Icon icon={icon} appearance={getIconAppearance()} />
            <Text size="medium">{children}</Text>
          </Stack>
          {selected && <MdChevronRight size="24px" />}
        </Stack>
      </StyledLink>
    </StyledNavLink>
  );
}

export { NavLink };
export type { NavLinkProps };
