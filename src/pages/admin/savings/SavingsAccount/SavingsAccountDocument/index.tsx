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
  accountnumber: string;
  lastDate: Date;
  netValue: number;
  minValue: number;
  accountState: string;
  accountGmf: string;
  requestDate: string;
  movementsEntries: IEntry[];
  commitmentAccount: string;
}

const today = new Date();

function SavingsAccountDocument(props: SavingsAccountDocumentProps) {
  const {
    username,
    userIdentification,
    accountnumber,
    lastDate,
    netValue,
    minValue,
    accountState,
    accountGmf,
    requestDate,
    movementsEntries,
    commitmentAccount,
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
              <Text type="label" size="small" weight="bold">
                Cliente:
              </Text>
              <Text type="label" size="small">
                {username}
              </Text>
            </Stack>
            <Stack gap={inube.spacing.s050}>
              <Text type="label" size="small" weight="bold">
                Identificación:
              </Text>
              <Text type="label" size="small">
                {userIdentification}
              </Text>
            </Stack>
            <Stack gap={inube.spacing.s050}>
              <Text type="label" size="small" weight="bold">
                Fecha de impresión:
              </Text>
              <Text type="label" size="small">
                {formatPrimaryDate(today, true)}
              </Text>
            </Stack>
          </Stack>
          <StyledHeaderCardContainer>
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
            <Text type="label" size="small" weight="bold">
              {`CUENTA DE AHORROS - ${accountnumber}`}
            </Text>
            <Stack gap={inube.spacing.s050}>
              <Text type="label" size="small" weight="bold">
                Sucursal:
              </Text>
              <Text type="label" size="small" appearance="gray">
                {""}
              </Text>
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
      {commitmentAccount !== "" && (
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
              label="Numero:"
              value={commitmentAccount}
              downloadable
            />
            <BoxAttribute label="Valor próximo pago:" value={""} downloadable />
            <BoxAttribute label="Fecha próximo pago:" value={""} downloadable />
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
                <Td key={colIndex} type="text" align="left">
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
