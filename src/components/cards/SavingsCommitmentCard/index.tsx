import { MdOpenInNew } from "react-icons/md";
import { StyledCardContainer, StyledCardHeading } from "./styles";
import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { Tag, TagProps } from "@design/data/Tag";
import { Icon } from "@design/data/Icon";
import { currencyFormat } from "src/utils/formats";
import { inube } from "@design/tokens";

interface SavingsCommitmentCardProps {
  onClick: () => void;
  title: string;
  value: number;
  label: string;
  tagValue?: TagProps;
  descriptionLabel?: string;
  descriptionValue?: string;
}

function SavingsCommitmentCard(props: SavingsCommitmentCardProps) {
  const {
    onClick,
    value,
    title,
    label,
    tagValue,
    descriptionLabel,
    descriptionValue,
  } = props;

  return (
    <StyledCardContainer>
      <StyledCardHeading>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          padding={`${inube.spacing.s075} ${inube.spacing.s100}`}
        >
          <Text type="label" size="medium">
            {title}
          </Text>
          <Text type="label" size="small">
            {currencyFormat(value)}
          </Text>
        </Stack>
      </StyledCardHeading>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        padding={`${inube.spacing.s075} ${inube.spacing.s100}`}
      >
        {tagValue ? (
          <Tag label={tagValue.label} appearance={tagValue.appearance} />
        ) : (
          <Stack gap="s100">
            <Text type="label" size="small">
              {descriptionLabel}:
            </Text>
            <Text type="body" size="small" appearance="gray">
              {descriptionValue}
            </Text>
          </Stack>
        )}
        <Stack gap="s050" alignItems="center">
          <Text type="label" size="small">
            {label}
          </Text>
          <Icon
            onClick={onClick}
            icon={<MdOpenInNew />}
            appearance="dark"
            size="16px"
            spacing="none"
            cursorHover
          />
        </Stack>
      </Stack>
    </StyledCardContainer>
  );
}

export type { SavingsCommitmentCardProps };
export { SavingsCommitmentCard };
