import { OutlineCard } from "@components/cards/OutlineCard";
import { StyledLogo } from "@design/navigation/Header/styles";
import { inube } from "@design/tokens";
import { Grid, Stack, Text } from "@inubekit/inubekit";
import { currencyFormat } from "src/utils/currency";
import { useTheme } from "styled-components";

interface AmortizationDocumentProps {
  productName: string;
  productNumber: string;
  loanDate: string;
  nextPaymentDate: string;
  loanValue: number;
  nextPaymentValue: number;
  periodicity: string;
  paymentMethod: string;
  tableElement?: React.JSX.Element;
}

function AmortizationDocument(props: AmortizationDocumentProps) {
  const {
    productName,
    productNumber,
    loanDate,
    nextPaymentDate,
    loanValue,
    nextPaymentValue,
    periodicity,
    paymentMethod,
    tableElement,
  } = props;

  const theme = useTheme();

  return (
    <Stack
      padding={`0 ${inube.spacing.s800}`}
      gap={inube.spacing.s250}
      width="21cm"
      direction="column"
    >
      <Stack justifyContent="flex-start" width="100%">
        <StyledLogo src={theme.images.logo} />
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
          autoRows="auto"
          gap={inube.spacing.s100}
          padding={inube.spacing.s150}
          width="100%"
        >
          <Stack gap={inube.spacing.s050} alignItems="center">
            <Text type="label" size="small">
              Fecha de préstamo:
            </Text>

            <Text type="body" size="small" appearance="gray">
              {loanDate}
            </Text>
          </Stack>

          <Stack gap={inube.spacing.s050} alignItems="center">
            <Text type="label" size="small">
              Fecha próximo pago:
            </Text>

            <Text type="body" size="small" appearance="gray">
              {nextPaymentDate}
            </Text>
          </Stack>

          <Stack gap={inube.spacing.s050} alignItems="center">
            <Text type="label" size="small">
              Valor del préstamo:
            </Text>

            <Text type="body" size="small" appearance="gray">
              {currencyFormat(loanValue)}
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
