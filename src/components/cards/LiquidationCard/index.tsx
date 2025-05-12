import { inube } from "@design/tokens";
import { Divider, Stack, Text } from "@inubekit/inubekit";
import { currencyFormat } from "@utils/currency";
import { StyledCard } from "./styles";

interface LiquidationCardProps {
  categoyName: string;
  entriesCount: number;
  unitValue: number;
  fullValue: number;
  subsidyName?: string;
  subisidyValue?: number;
  subTotal: number;
}

function LiquidationCard(props: LiquidationCardProps) {
  const {
    categoyName,
    entriesCount,
    unitValue,
    fullValue,
    subisidyValue,
    subsidyName,
    subTotal,
  } = props;

  return (
    <StyledCard>
      <Text type="label" size="large" weight="bold">
        Categoría {categoyName}
      </Text>

      <Stack direction="column" gap={inube.spacing.s050}>
        <Stack
          direction="row"
          gap={inube.spacing.s100}
          justifyContent="space-between"
        >
          <Text type="label" size="large" appearance="gray">
            Entradas solicitadas:
          </Text>
          <Text type="body" size="medium">
            {entriesCount}
          </Text>
        </Stack>

        <Stack
          direction="row"
          gap={inube.spacing.s100}
          justifyContent="space-between"
        >
          <Text type="label" size="large" appearance="gray">
            Valor unitario:
          </Text>
          <Text type="body" size="medium">
            {currencyFormat(unitValue)}
          </Text>
        </Stack>

        <Stack
          direction="row"
          gap={inube.spacing.s100}
          justifyContent="space-between"
        >
          <Text type="label" size="large" appearance="gray">
            Valor pleno:
          </Text>
          <Text type="body" size="medium">
            {currencyFormat(fullValue)}
          </Text>
        </Stack>

        {subisidyValue && subsidyName && (
          <Stack
            direction="row"
            gap={inube.spacing.s100}
            justifyContent="space-between"
          >
            <Text type="label" size="large" appearance="gray">
              {subsidyName}:
            </Text>
            <Text type="body" size="medium" appearance="danger">
              {currencyFormat(-subisidyValue)}
            </Text>
          </Stack>
        )}
      </Stack>

      <Divider dashed />

      <Stack direction="row" justifyContent="flex-end">
        <Stack direction="row" gap={inube.spacing.s100}>
          <Text type="label" size="large" weight="bold" appearance="gray">
            Subtotal:
          </Text>
          <Text type="body" size="medium" weight="bold">
            {currencyFormat(subTotal)}
          </Text>
        </Stack>
      </Stack>
    </StyledCard>
  );
}

export { LiquidationCard };
export type { LiquidationCardProps };
