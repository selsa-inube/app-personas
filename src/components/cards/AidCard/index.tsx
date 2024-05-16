import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { MdChevronRight } from "react-icons/md";
import { StyledCardContainer } from "./styles";

interface AidCardProps {
  aid: string;
  description: string;
}

function AidCard(props: AidCardProps) {
  const { aid, description } = props;
  return (
    <StyledCardContainer>
      <Stack justifyContent="space-between" alignItems="center">
        <Text type="title" size="medium">
          {aid}
        </Text>
        <Icon
          icon={<MdChevronRight />}
          appearance="primary"
          size="24px"
          spacing="none"
          cursorHover
        />
      </Stack>
      <Text type="body" size="medium" appearance="gray">
        {description}
      </Text>
    </StyledCardContainer>
  );
}

export { AidCard };
export type { AidCardProps };
