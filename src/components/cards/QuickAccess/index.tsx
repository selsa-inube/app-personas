import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";

import { StyledContainer, StyledLink, StyledQuickAccess } from "./styles";
import { ILink } from "./types";

interface QuickAccessProps {
  links: ILink[];
}

function QuickAccess(props: QuickAccessProps) {
  const { links } = props;

  return (
    <StyledQuickAccess>
      <Stack direction="column" gap="24px">
        <Text type="label">Accesos rápidos</Text>
        <StyledContainer>
          {links.map((link) => (
            <StyledLink key={link.label} to={link.path}>
              <Stack alignItems="center" gap="24px" padding="8px 16px">
                <Icon icon={link.icon} spacing="none" appearance="dark" />
                <Text size="medium">{link.label}</Text>
              </Stack>
            </StyledLink>
          ))}
        </StyledContainer>
      </Stack>
    </StyledQuickAccess>
  );
}

export { QuickAccess };
export type { QuickAccessProps };
