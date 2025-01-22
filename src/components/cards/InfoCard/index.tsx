import { inube } from "@design/tokens";
import { Icon, Stack, Text } from "@inubekit/inubekit";
import { StyledCardContainer } from "./styles";
import { InfoCardAppearanceType } from "./types";

interface InfoCardProps {
  title: string;
  description?: string;
  icon: React.JSX.Element;
  appearance?: InfoCardAppearanceType;
}

function InfoCard(props: InfoCardProps) {
  const { title, description, icon, appearance = "primary" } = props;

  return (
    <StyledCardContainer $appearance={appearance}>
      <Stack gap={inube.spacing.s100} alignItems="center">
        <Icon
          icon={icon}
          appearance={appearance}
          size="20px"
          spacing="narrow"
        />
        <Text type="label" size="large" weight="bold">
          {title}
        </Text>
      </Stack>

      {description && (
        <Text type="body" size="medium" appearance="gray">
          {description}
        </Text>
      )}
    </StyledCardContainer>
  );
}

export { InfoCard };
export type { InfoCardProps };
