import { MdCalendarMonth } from "react-icons/md";
import { StyledCardContainer } from "./styles";
import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { Tag, TagProps } from "@design/data/Tag";
import { Icon } from "@design/data/Icon";
import { currencyFormat } from "src/utils/formats";

interface SavingsCommitmentCardProps {
  onClick: () => void;
  title: string;
  value: number;
  date: string;
  tag?: TagProps;
  descriptionDate?: string;
  descriptionValue?: string;
}

function SavingsCommitmentCard(props: SavingsCommitmentCardProps) {
  const {
    onClick,
    value,
    title,
    date,
    tag,
    descriptionDate,
    descriptionValue,
  } = props;

  return (
    <StyledCardContainer onClick={onClick}>
      <Stack direction="column" alignItems="flex-start" gap="s075">
        <Stack alignItems="center" gap="s075">
          <Icon size="16px" icon={<MdCalendarMonth />} spacing="none"></Icon>
          <Text type="label" size="medium">
            {title}
          </Text>
        </Stack>
        {tag && <Tag label={tag.label} appearance={tag.appearance} />}
      </Stack>
      <Stack direction="column">
        <Stack gap="s075">
          <Text type="label" size="small">
            {descriptionValue}:
          </Text>
          <Text type="body" size="small" appearance="gray">
            {currencyFormat(value)}
          </Text>
        </Stack>
        <Stack gap="s075">
          <Text type="label" size="small">
            {descriptionDate}:
          </Text>
          <Text type="body" size="small" appearance="gray">
            {date}
          </Text>
        </Stack>
      </Stack>
    </StyledCardContainer>
  );
}

export type { SavingsCommitmentCardProps };
export { SavingsCommitmentCard };
