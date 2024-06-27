import { Text } from "@design/data/Text";
import { Divider } from "@design/layout/Divider";
import { Stack } from "@design/layout/Stack";
import { currencyFormat } from "src/utils/currency";
import { StyledBody, StyledCardContainer, StyledInputRadio } from "./styles";

interface DestinationCardProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  maxRate: number;
  maxDeadline: number;
  maxAmount: number;
  onClick: () => void;
}

function DestinationCard(props: DestinationCardProps) {
  const {
    id,
    title,
    description,
    checked,
    maxRate,
    maxDeadline,
    maxAmount,
    onClick,
  } = props;

  return (
    <StyledCardContainer onClick={onClick}>
      <Stack direction="column" width="100%">
        <Stack gap="s100">
          <StyledInputRadio
            id={id}
            name={id}
            type="radio"
            value={id}
            checked={checked}
            readOnly
          />

          <Text type="label" size="medium">
            {title}
          </Text>
        </Stack>
        <Text type="body" size="small" appearance="gray">
          {description}
        </Text>
      </Stack>

      <Divider dashed />

      <StyledBody>
        <Stack alignItems="center" justifyContent="space-between" width="100%">
          <Text type="label" size="small" appearance="gray">
            Tasa máxima:
          </Text>

          <Text type="body" size="small">
            {maxRate}%
          </Text>
        </Stack>

        <Stack alignItems="center" justifyContent="space-between" width="100%">
          <Text type="label" size="small" appearance="gray">
            Plazo máximo:
          </Text>

          <Text type="body" size="small">
            {maxDeadline} meses
          </Text>
        </Stack>

        <Stack alignItems="center" justifyContent="space-between" width="100%">
          <Text type="label" size="small" appearance="gray">
            Monto máximo:
          </Text>

          <Text type="body" size="small">
            {currencyFormat(maxAmount)}
          </Text>
        </Stack>
      </StyledBody>
    </StyledCardContainer>
  );
}

export { DestinationCard };
export type { DestinationCardProps };
