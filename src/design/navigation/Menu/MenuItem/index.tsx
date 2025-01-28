import { StyledMenuItemContainer } from "./styles";

import { inube } from "@design/tokens";
import { Icon, Stack, Text } from "@inubekit/inubekit";
import { MenuItemSpacingType } from "./types";

interface MenuItemProps {
  title: string;
  description?: string;
  spacing?: MenuItemSpacingType;
  iconBefore?: React.JSX.Element;
  iconAfter?: React.JSX.Element;
  disabled?: boolean;
  path?: string;
  onClick?: () => void;
}

function MenuItem(props: MenuItemProps) {
  const {
    title,
    description,
    spacing = "wide",
    iconBefore,
    iconAfter,
    disabled = false,
    path = "#",
    onClick,
  } = props;

  return (
    <StyledMenuItemContainer
      $spacing={spacing}
      $disabled={disabled}
      to={path}
      onClick={onClick}
    >
      <Stack gap={inube.spacing.s150} alignItems="center">
        {iconBefore && (
          <Icon
            icon={iconBefore}
            spacing="narrow"
            size="24px"
            appearance="dark"
            disabled={disabled}
          />
        )}
        <Stack direction="column" gap={inube.spacing.s050}>
          <Text type="label" size="large" disabled={disabled}>
            {title}
          </Text>
          <Text type="body" size="small" appearance="gray" disabled={disabled}>
            {description}
          </Text>
        </Stack>
      </Stack>
      {iconAfter && (
        <Icon
          icon={iconAfter}
          spacing="narrow"
          size="24px"
          appearance="dark"
          disabled={disabled}
        />
      )}
    </StyledMenuItemContainer>
  );
}

export { MenuItem };
export type { MenuItemProps };
