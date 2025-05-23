import { inube } from "@design/tokens";
import { Icon, ITag, Stack, Tag, Text } from "@inubekit/inubekit";
import { MdCalendarMonth } from "react-icons/md";
import { IAttribute } from "src/model/entity/product";
import { StyledCardContainer } from "./styles";

interface CommitmentCardProps {
  onClick: () => void;
  title: string;
  attributes: IAttribute[];
  tag?: ITag;
}

function CommitmentCard(props: CommitmentCardProps) {
  const { onClick, title, tag, attributes } = props;

  const truncatedAttributes = attributes.slice(0, 3);

  return (
    <StyledCardContainer onClick={onClick}>
      <Stack alignItems="flex-start" gap={inube.spacing.s075}>
        <Icon
          size="16px"
          appearance="primary"
          icon={<MdCalendarMonth />}
          spacing="narrow"
        />
        <Stack
          direction="column"
          alignItems="flex-start"
          gap={inube.spacing.s075}
        >
          <Text type="label" size="medium">
            {title}
          </Text>
          {tag && <Tag label={tag.label} appearance={tag.appearance} />}
        </Stack>
      </Stack>

      <Stack direction="column">
        {truncatedAttributes.map((attribute, index) => (
          <Stack gap={inube.spacing.s075} key={index}>
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

export { CommitmentCard };
export type { CommitmentCardProps };
