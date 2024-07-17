import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { Divider } from "@inubekit/divider";
import { SkeletonLine } from "@inubekit/skeleton";
import { currencyFormat } from "src/utils/currency";
import { StyledBody, StyledCardContainer, StyledInputRadio } from "./styles";

interface DestinationCardProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  maxRate?: number;
  maxDeadline?: number;
  maxAmount: number;
  loading?: boolean;
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
    loading,
    onClick,
  } = props;

  if (loading) {
    return (
      <StyledCardContainer>
        <Stack direction="column" width="100%" gap="s050">
          <Stack gap="s100">
            <StyledInputRadio
              id={id}
              name={id}
              type="radio"
              value={id}
              checked={checked}
              readOnly
              disabled
            />

            <SkeletonLine animated width="86px" />
          </Stack>
          <SkeletonLine animated width="108px" />
        </Stack>

        <Divider dashed />

        <StyledBody $loading>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <SkeletonLine animated width="100px" />

            <SkeletonLine animated width="50px" />
          </Stack>

          <Stack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <SkeletonLine animated width="100px" />

            <SkeletonLine animated width="50px" />
          </Stack>

          <Stack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <SkeletonLine animated width="100px" />

            <SkeletonLine animated width="50px" />
          </Stack>
        </StyledBody>
      </StyledCardContainer>
    );
  }

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
        {maxRate && (
          <Stack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Text type="label" size="small" appearance="gray">
              Tasa máxima:
            </Text>

            <Text type="body" size="small">
              {maxRate}%
            </Text>
          </Stack>
        )}

        {maxDeadline && (
          <Stack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Text type="label" size="small" appearance="gray">
              Plazo máximo:
            </Text>

            <Text type="body" size="small">
              {maxDeadline} meses
            </Text>
          </Stack>
        )}

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
