import { BoxAttribute } from "@components/cards/BoxAttribute";
import { IEntry } from "@design/data/Table/types";
import { inube } from "@design/tokens";
import {
  Col,
  Colgroup,
  Divider,
  Grid,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@inubekit/inubekit";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryTimestamp } from "src/utils/dates";
import { creditQuotaTitles } from "../config/tables";
import { StyledCardContainer, StyledDetailsCard, StyledLogo } from "./styles";
import { StyledTableContainer } from "@design/data/Table/styles";

interface CreditLimitDocumentProps {
  username: string;
  userIdentification: string;
  cardNumber: string;
  quotaNumber: string;
  title: string;
  availableValue: number;
  assignedValue: number;
  usedValue: number;
  nextPaymentDate: string;
  creditType: string;
  paymentMethod: string;
  minCapitalPayment: number;
  totalCapitalPayment: number;
  minInterest: number;
  totalInterest: number;
  minPenaltyInterest: number;
  totalPenaltyInterest: number;
  minPayment: number;
  totalPayment: number;
  movementEntries: IEntry[];
  logoUrl: string;
}

const today = new Date();

const renderPaymentDetails = (
  title: string,
  details: Array<{ label: string; value: string | number }>,
  total: number,
) => (
  <StyledDetailsCard>
    <Text type="label" weight="bold" size="small">
      {title}
    </Text>
    <Stack direction="column" gap={inube.spacing.s050}>
      {details.map(({ label, value }, index) => (
        <Stack key={index} justifyContent="space-between">
          <Text type="label" size="small">
            {label}:
          </Text>
          <Text type="label" size="small" appearance="gray">
            {typeof value === "number" ? currencyFormat(value) : value}
          </Text>
        </Stack>
      ))}
    </Stack>
    <Divider dashed />
    <Stack justifyContent="space-between">
      <Text type="label" weight="bold" size="small">
        Total:
      </Text>
      <Text type="label" size="small">
        {currencyFormat(total)}
      </Text>
    </Stack>
  </StyledDetailsCard>
);

function CreditLimitDocument(props: CreditLimitDocumentProps) {
  const {
    username,
    userIdentification,
    cardNumber,
    quotaNumber,
    title,
    availableValue,
    assignedValue,
    usedValue,
    nextPaymentDate,
    creditType,
    paymentMethod,
    minCapitalPayment,
    totalCapitalPayment,
    minInterest,
    totalInterest,
    minPenaltyInterest,
    totalPenaltyInterest,
    minPayment,
    totalPayment,
    movementEntries,
    logoUrl,
  } = props;

  return (
    <Stack
      padding={`0 ${inube.spacing.s400}`}
      gap={inube.spacing.s250}
      width="225mm"
      direction="column"
    >
      <Stack gap={inube.spacing.s200} direction="column">
        <Stack justifyContent="space-between" alignItems="center">
          <Stack direction="column" gap={inube.spacing.s200}>
            <Text type="title" size="medium" weight="bold">
              Extracto cupo de crédito
            </Text>
            <Stack gap={inube.spacing.s050} direction="column">
              {[
                {
                  label: "Cliente",
                  value: `${userIdentification} - ${username}`,
                },
                {
                  label: "Fecha de impresión",
                  value: formatPrimaryTimestamp(today, true),
                },
              ].map(({ label, value }, index) => (
                <Stack key={index} gap={inube.spacing.s050}>
                  <Text
                    type="label"
                    size="small"
                    weight="bold"
                    appearance="gray"
                  >
                    {label}:
                  </Text>
                  <Text type="label" size="small" appearance="gray">
                    {value}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </Stack>
          <StyledLogo src={logoUrl} />
        </Stack>
      </Stack>

      <StyledCardContainer>
        <Text type="label" size="small" weight="bold" appearance="gray">
          {title}
        </Text>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={inube.spacing.s100}
          autoRows="auto"
        >
          <BoxAttribute label="Cupo:" value={quotaNumber} downloadable />
          <BoxAttribute label="Tarjeta:" value={cardNumber} downloadable />
        </Grid>
      </StyledCardContainer>

      <StyledCardContainer>
        <Text type="label" size="small" weight="bold" appearance="gray">
          RESUMEN
        </Text>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={inube.spacing.s100}
          autoRows="auto"
        >
          {[
            { label: "Cupo asignado:", value: assignedValue },
            { label: "Cupo disponible:", value: availableValue },
            { label: "Cupo usado:", value: usedValue },
            { label: "Fecha próximo pago:", value: nextPaymentDate },
            { label: "Tipo:", value: creditType },
            { label: "Medio de pago:", value: paymentMethod },
          ].map(({ label, value }, index) => (
            <BoxAttribute
              key={index}
              label={label}
              value={typeof value === "number" ? currencyFormat(value) : value}
              downloadable
            />
          ))}
        </Grid>
      </StyledCardContainer>

      <StyledCardContainer>
        <Text type="label" size="small" weight="bold" appearance="gray">
          DETALLES
        </Text>
        <Stack gap={inube.spacing.s100}>
          {renderPaymentDetails(
            "Valor próximo pago",
            [
              { label: "Fecha próximo pago", value: nextPaymentDate },
              { label: "Abono a capital", value: minCapitalPayment },
              { label: "Interés corriente", value: minInterest },
              { label: "Interés de mora", value: minPenaltyInterest },
            ],
            minPayment,
          )}

          {renderPaymentDetails(
            "Valor pago total",
            [
              { label: "Fecha próximo pago", value: nextPaymentDate },
              { label: "Abono a capital", value: totalCapitalPayment },
              { label: "Interés corriente", value: totalInterest },
              { label: "Interés de mora", value: totalPenaltyInterest },
            ],
            totalPayment,
          )}
        </Stack>
      </StyledCardContainer>
      <StyledTableContainer>
        <Table>
          <Colgroup>
            {["13%", "17%", "46%", "12%", "12%"].map((width, index) => (
              <Col key={index} span={1} style={{ width }} />
            ))}
          </Colgroup>
          <Thead>
            <Tr border="bottom">
              {creditQuotaTitles.map((option, index) => (
                <Th key={index} action={option.action} align="center">
                  <Text type="label" size="small" weight="bold">
                    {option.label}
                  </Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {movementEntries.map((row, rowIndex) => (
              <Tr key={rowIndex} border="bottom">
                {creditQuotaTitles.map((header, colIndex) => (
                  <Td
                    key={colIndex}
                    type="text"
                    align={
                      colIndex >= creditQuotaTitles.length - 2
                        ? "right"
                        : "left"
                    }
                  >
                    <Text type="label" size="small">
                      {row[header.id]}
                    </Text>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </StyledTableContainer>
    </Stack>
  );
}

export { CreditLimitDocument };
