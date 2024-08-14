import { Text } from "@design/data/Text";
import { inube } from "@design/tokens";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
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
      <Icon icon={icon} appearance={appearance} size="24px" spacing="narrow" />

      <Stack direction="column" width="100%" gap={inube.spacing.s075}>
        <Text type="label" size="large">
          {title}
        </Text>

        {description && (
          <Text type="body" size="medium">
            {description}
          </Text>
        )}
      </Stack>
    </StyledCardContainer>
  );
}

export { InfoCard };
export type { InfoCardProps };
