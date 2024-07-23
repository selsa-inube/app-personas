import { OutlineCard } from "@components/cards/OutlineCard";
import { logoUrl } from "@config/header";
import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { StyledLogo } from "@design/navigation/Header/styles";
import { inube } from "@design/tokens";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";

interface AmortizationDocumentProps {
  productName: string;
  productNumber: string;
  date: Date;
  nextPaymentDate: Date;
  amount: number;
  nextPaymentValue: number;
  periodicity: string;
  paymentMethod: string;
  tableElement?: React.JSX.Element;
}

function AmortizationDocument(props: AmortizationDocumentProps) {
  const {
    productName,
    productNumber,
    date,
    nextPaymentDate,
    amount,
    nextPaymentValue,
    periodicity,
    paymentMethod,
    tableElement,
  } = props;

  return (
    <Stack
      padding={`${inube.spacing.s600} ${inube.spacing.s800}`}
      gap={inube.spacing.s250}
      width="100%"
      direction="column"
    >
      <Stack justifyContent="flex-start" width="100%">
        <StyledLogo src={logoUrl} />
      </Stack>

      <Stack
        direction="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Text type="title" size="small" textAlign="center">
          {productName}
        </Text>
        <Text type="body" size="small" appearance="gray" textAlign="center">
          {productNumber}
        </Text>
      </Stack>

      <OutlineCard>
        <Grid
          templateColumns="1fr 1fr"
          gap={inube.spacing.s100}
          padding={inube.spacing.s150}
          width="100%"
        >
          <Stack gap={inube.spacing.s050} alignItems="center">
            <Text type="label" size="small">
              Fecha de préstamo:
            </Text>

            <Text type="body" size="small" appearance="gray">
              {formatPrimaryDate(date)}
            </Text>
          </Stack>

          <Stack gap={inube.spacing.s050} alignItems="center">
            <Text type="label" size="small">
              Fecha próximo pago:
            </Text>

            <Text type="body" size="small" appearance="gray">
              {formatPrimaryDate(nextPaymentDate)}
            </Text>
          </Stack>

          <Stack gap={inube.spacing.s050} alignItems="center">
            <Text type="label" size="small">
              Valor del préstamo:
            </Text>

            <Text type="body" size="small" appearance="gray">
              {currencyFormat(amount)}
            </Text>
          </Stack>

          <Stack gap={inube.spacing.s050} alignItems="center">
            <Text type="label" size="small">
              Total próximo pago:
            </Text>

            <Text type="body" size="small" appearance="gray">
              {currencyFormat(nextPaymentValue)}
            </Text>
          </Stack>

          <Stack gap={inube.spacing.s050} alignItems="center">
            <Text type="label" size="small">
              Periodicidad:
            </Text>

            <Text type="body" size="small" appearance="gray">
              {periodicity}
            </Text>
          </Stack>

          <Stack gap={inube.spacing.s050} alignItems="center">
            <Text type="label" size="small">
              Medio de pago:
            </Text>

            <Text type="body" size="small" appearance="gray">
              {paymentMethod}
            </Text>
          </Stack>
        </Grid>
      </OutlineCard>

      {tableElement}
    </Stack>
  );
}

export { AmortizationDocument };
