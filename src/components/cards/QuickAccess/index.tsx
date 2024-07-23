import { Text } from "@design/data/Text";

import { StyledContainer, StyledLink, StyledQuickAccess } from "./styles";
import { ILink } from "./types";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";

interface QuickAccessProps {
  links: ILink[];
}

function QuickAccess(props: QuickAccessProps) {
  const { links } = props;

  return (
    <StyledQuickAccess>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Text type="label">Accesos rápidos</Text>
        <StyledContainer>
          {links.map((link) => (
            <StyledLink key={link.label} to={link.path}>
              <Stack
                alignItems="center"
                gap={inube.spacing.s300}
                padding={`${inube.spacing.s100} ${inube.spacing.s200}`}
              >
                <Icon
                  icon={link.icon}
                  spacing="narrow"
                  appearance="dark"
                  size="28px"
                />
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
