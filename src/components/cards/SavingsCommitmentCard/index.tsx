import { Icon } from "@design/data/Icon";
import { Tag, TagProps } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { MdCalendarMonth } from "react-icons/md";
import { IAttribute } from "src/model/entity/product";
import { StyledCardContainer } from "./styles";

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
      <Stack alignItems="flex-start" gap="s075">
        <Icon size="16px" icon={<MdCalendarMonth />} spacing="none" />
        <Stack direction="column" alignItems="flex-start" gap="s075">
          <Text type="label" size="medium">
            {title}
          </Text>
          {tag && <Tag label={tag.label} appearance={tag.appearance} />}
        </Stack>
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

export { SavingsCommitmentCard };
export type { SavingsCommitmentCardProps };
