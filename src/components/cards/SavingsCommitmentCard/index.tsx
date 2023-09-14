import { MdOpenInNew } from "react-icons/md";
import {
  StyledCardContainer,
  StyledCardHeading,
  StyledViewContainer,
} from "./styles";
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
  tag?: TagProps;
  descriptionLabel?: string;
  descriptionValue?: string;
}

function SavingsCommitmentCard(props: SavingsCommitmentCardProps) {
  const {
    onClick,
    value,
    title,
    label,
    tag,
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
        {tag ? (
          <Tag label={tag.label} appearance={tag.appearance} />
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
        <StyledViewContainer onClick={onClick}>
          <Text type="label" size="small">
            {label}
          </Text>
          <Icon
            icon={<MdOpenInNew />}
            appearance="dark"
            size="16px"
            spacing="none"
            cursorHover
          />
        </StyledViewContainer>
      </Stack>
    </StyledCardContainer>
  );
}

export type { SavingsCommitmentCardProps };
export { SavingsCommitmentCard };
