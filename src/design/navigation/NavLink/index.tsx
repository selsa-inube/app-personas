import { MdChevronRight } from "react-icons/md";

import { StyledLink, StyledNavLink } from "./styles";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { inube } from "@design/tokens";

interface NavLinkProps {
  icon: React.JSX.Element;
  children: React.ReactNode;
  path?: string;
  selected?: boolean;
  onClick?: () => void;
}

function NavLink(props: NavLinkProps) {
  const { icon, children, path = "#", selected = false, onClick } = props;

  function getIconAppearance() {
    if (selected) {
      return "primary";
    }
    return "dark";
  }

  return (
    <StyledNavLink $selected={selected} onClick={onClick}>
      <StyledLink to={path} $selected={selected}>
        <Stack width="100%" alignItems="center" justifyContent="space-between">
          <Stack alignItems="center" gap={inube.spacing.s300}>
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
