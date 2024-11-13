import { logoUrl } from "@config/header";
import { StyledLogo } from "@design/navigation/Header/styles";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { formatPrimaryDate } from "src/utils/dates";
import { StyledCardContainer, StyledHeaderCardContainer } from "./styles";
import { Grid } from "@inubekit/grid";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { currencyFormat } from "src/utils/currency";
import {
  Col,
  Colgroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@inubekit/table";
import { savingsAccountDocumentTitles } from "./tables";
import { IEntry } from "@design/data/Table/types";

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
      padding={inube.spacing.s400}
      gap={inube.spacing.s200}
      width="225mm"
      direction="column"
    >
      <Stack gap={inube.spacing.s200} direction="column">
        <Stack height="30px" justifyContent="space-between" alignItems="center">
          <Text type="title" size="medium" weight="bold">
            Extracto cuenta de ahorros
          </Text>
          <Stack>
            <StyledLogo src={logoUrl} />
          </Stack>
        </Stack>
        <Stack justifyContent="space-between" alignItems="center">
          <Stack gap={inube.spacing.s050} direction="column">
            <Stack gap={inube.spacing.s050}>
              <Text type="label" size="small" weight="bold" appearance="gray">
                Cliente:
              </Text>
              <Text type="label" size="small" appearance="gray">
                {username}
              </Text>
            </Stack>
            <Stack gap={inube.spacing.s050}>
              <Text type="label" size="small" weight="bold" appearance="gray">
                Identificación:
              </Text>
              <Text type="label" size="small" appearance="gray">
                {userIdentification}
              </Text>
            </Stack>
            <Stack gap={inube.spacing.s050}>
              <Text type="label" size="small" weight="bold" appearance="gray">
                Fecha de impresión:
              </Text>
              <Text type="label" size="small" appearance="gray">
                {formatPrimaryDate(today, true)}
              </Text>
            </Stack>
          </Stack>
          <StyledHeaderCardContainer>
            <Text type="label" size="small" weight="bold">
              CUENTA DE AHORROS
            </Text>
            <Stack gap={inube.spacing.s050}>
              <Text type="label" size="small" weight="bold">
                Número de producto:
              </Text>
              <Text type="label" size="small" appearance="gray">
                {accountNumber}
              </Text>
            </Stack>
            <Stack gap={inube.spacing.s100}>
              <Stack gap={inube.spacing.s050}>
                <Text type="label" size="small" weight="bold">
                  Desde:
                </Text>
                <Text type="label" size="small" appearance="gray">
                  {formatPrimaryDate(lastDate)}
                </Text>
              </Stack>
              <Stack gap={inube.spacing.s050}>
                <Text type="label" size="small" weight="bold">
                  Hasta:
                </Text>
                <Text type="label" size="small" appearance="gray">
                  {formatPrimaryDate(today)}
                </Text>
              </Stack>
            </Stack>
          </StyledHeaderCardContainer>
        </Stack>
      </Stack>

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
                style={{ width: ["12%", "64%", "12%", "12%"][index] }}
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
