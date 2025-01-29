import { BoxAttribute } from "@components/cards/BoxAttribute";
import { logoUrl } from "@config/header";
import { IEntry } from "@design/data/Table/types";
import { inube } from "@design/tokens";
import {
  Col,
  Colgroup,
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
import { formatPrimaryDate } from "src/utils/dates";
import { StyledCardContainer, StyledLogo } from "./styles";
import { savingsAccountDocumentTitles } from "./tables";

interface SavingsAccountDocumentProps {
  username: string;
  userIdentification: string;
  accountNumber: string;
  lastDate: Date;
  netValue: number;
  minValue: number;
  accountState: string;
  accountGmf: string;
  requestDate: string;
  movementsEntries: IEntry[];
  commitmentId: string;
  commitmentValue: string;
  commitmentNextPaymentValue: number;
  commitmentDate: string;
}

const today = new Date();

function SavingsAccountDocument(props: SavingsAccountDocumentProps) {
  const {
    username,
    userIdentification,
    accountNumber,
    lastDate,
    netValue,
    minValue,
    accountState,
    accountGmf,
    requestDate,
    movementsEntries,
    commitmentId,
    commitmentValue,
    commitmentNextPaymentValue,
    commitmentDate,
  } = props;

  return (
    <Stack
      padding={`0 ${inube.spacing.s400}`}
      gap={inube.spacing.s200}
      width="225mm"
      direction="column"
    >
      <Stack gap={inube.spacing.s200} direction="column">
        <Stack justifyContent="space-between" alignItems="center">
          <Stack direction="column" gap={inube.spacing.s200}>
            <Text type="title" size="medium" weight="bold">
              Extracto cuenta de ahorros
            </Text>
            <Stack gap={inube.spacing.s050} direction="column">
              {[
                {
                  label: "Cliente",
                  value: `${userIdentification} - ${username}`,
                },
                {
                  label: "Fecha de impresión",
                  value: formatPrimaryDate(today, true),
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
          CUENTA DE AHORROS
        </Text>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={inube.spacing.s100}
          autoRows="auto"
        >
          <BoxAttribute
            label="Número de producto:"
            value={accountNumber}
            downloadable
          />
          <BoxAttribute
            label="Desde:"
            value={formatPrimaryDate(lastDate)}
            downloadable
          />
          <BoxAttribute
            label="Hasta:"
            value={formatPrimaryDate(today)}
            downloadable
          />
        </Grid>
      </StyledCardContainer>

      <StyledCardContainer>
        <Text type="label" size="small" weight="bold" appearance="gray">
          RESUMEN
        </Text>
        <Grid
          templateColumns={`repeat(3, 1fr)`}
          gap={inube.spacing.s100}
          autoRows="auto"
        >
          <BoxAttribute
            label="Saldo total:"
            value={currencyFormat(netValue)}
            downloadable
          />
          <BoxAttribute
            label="Saldo mínimo:"
            value={currencyFormat(minValue)}
            downloadable
          />
          <BoxAttribute label="Estado:" value={accountState} downloadable />
          <BoxAttribute label="GMF:" value={accountGmf} downloadable />
          <BoxAttribute
            label="Fecha de apertura:"
            value={requestDate}
            downloadable
          />
        </Grid>
      </StyledCardContainer>
      {commitmentId !== "" && (
        <StyledCardContainer>
          <Text type="label" size="small" weight="bold" appearance="gray">
            COMPROMISOS DE AHORRO
          </Text>
          <Grid
            templateColumns={`repeat(3, 1fr)`}
            gap={inube.spacing.s100}
            autoRows="auto"
          >
            <BoxAttribute
              label="Compromiso:"
              value={commitmentValue}
              downloadable
            />
            <BoxAttribute
              label="Valor próximo pago:"
              value={currencyFormat(commitmentNextPaymentValue)}
              downloadable
            />
            <BoxAttribute
              label="Fecha próximo pago:"
              value={commitmentDate}
              downloadable
            />
          </Grid>
        </StyledCardContainer>
      )}
      <Table>
        <Colgroup>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Col
                key={index}
                span={1}
                style={{ width: ["14%", "62%", "12%", "12%"][index] }}
              />
            ))}
        </Colgroup>
        <Thead>
          <Tr border="bottom">
            {savingsAccountDocumentTitles.map((option, index) => (
              <Th key={index} action={option.action} align="center">
                <Text type="label" size="small" weight="bold">
                  {option.label}
                </Text>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {movementsEntries.map((row, rowIndex) => (
            <Tr key={rowIndex} border="bottom">
              {savingsAccountDocumentTitles.map((header, colIndex) => (
                <Td
                  key={colIndex}
                  type="text"
                  align={
                    colIndex >= savingsAccountDocumentTitles.length - 2
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
    </Stack>
  );
}

export { SavingsAccountDocument };
