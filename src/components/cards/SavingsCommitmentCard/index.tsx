import { MdCalendarMonth } from "react-icons/md";
import { StyledCardContainer } from "./styles";
import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { Tag, TagProps } from "@design/data/Tag";
import { Icon } from "@design/data/Icon";
import { IAttribute } from "src/model/entity/product";

interface SavingsCommitmentCardProps {
  onClick: () => void;
  title: string;
  tag?: TagProps;
  attributes: IAttribute[];
}

function SavingsCommitmentCard(props: SavingsCommitmentCardProps) {
  const { onClick, title, tag, attributes } = props;

  const truncatedAttributes = attributes.slice(0, 2);

  return (
    <StyledCardContainer onClick={onClick}>
      <Stack direction="column" alignItems="flex-start" gap="s075">
        <Stack alignItems="center" gap="s075">
          <Icon size="16px" icon={<MdCalendarMonth />} spacing="none" />
          <Text type="label" size="medium">
            {title}
          </Text>
        </Stack>
        {tag && <Tag label={tag.label} appearance={tag.appearance} />}
      </Stack>
      <Stack direction="column">
        {truncatedAttributes.map((attribute, index) => (
          <Stack gap="s075" key={index}>
            <Text type="label" size="small">
              {attribute.label}:
            </Text>
            <Text type="body" size="small" appearance="gray">
              {String(attribute.value)}
            </Text>
          </Stack>
        ))}
      </Stack>
    </StyledCardContainer>
  );
}

export type { SavingsCommitmentCardProps };
export { SavingsCommitmentCard };
