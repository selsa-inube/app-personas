import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { StyledCardContainer } from "./styles";
import { InfoCardAppearanceType } from "./types";

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.JSX.Element;
  appearance?: InfoCardAppearanceType;
}

function InfoCard(props: InfoCardProps) {
  const { title, description, icon, appearance = "primary" } = props;

  return (
    <StyledCardContainer appearance={appearance}>
      <Icon icon={icon} appearance={appearance} size="24px" spacing="none" />

      <Stack direction="column" width="100%" gap="s075">
        <Text type="label" size="large">
          {title}
        </Text>

        <Text type="body" size="medium">
          {description}
        </Text>
      </Stack>
    </StyledCardContainer>
  );
}

export { InfoCard };
export type { InfoCardProps };
