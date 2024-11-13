import { logoUrl } from "@config/header";
import { StyledLogo } from "@design/navigation/Header/styles";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { formatPrimaryDate } from "src/utils/dates";
import { IEntry } from "@design/data/Table/types";
import { IProduct } from "src/model/entity/product";
import { Grid } from "@inubekit/grid";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { StyledCardContainer } from "./styles";
import { currencyFormat } from "src/utils/currency";
import {
  cardsTableTitles,
  commitmentsTableTitles,
  paymentSummaryTitles,
  savingsTableTitles,
} from "../config/tables";
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

const today = new Date();

interface AccountStatementDocumentProps {
  userName: string;
  userIdentification: string;
  savingsAccountEntries: IEntry[];
  savingsContributionsEntries: IEntry[];
  programmedSavingsEntries: IEntry[];
  commitmentsSavingsEntries: IEntry[];
  obligationsEntries: IEntry[];
  creditCardsEntries: IEntry[];
  credits: IProduct[];
}

interface TableSectionProps {
  title: string;
  tableTitles: { id: string; label: string; action?: boolean }[];
  dataEntries: IEntry[];
  colSpan: number;
  grayText?: boolean;
  colWidths: string[];
}

function TableSection(props: TableSectionProps) {
  const {
    title,
    tableTitles,
    dataEntries,
    colSpan,
    grayText = false,
    colWidths = [],
  } = props;

  return (
    <Stack gap={inube.spacing.s200} direction="column">
      <Text
        type="label"
        size="medium"
        weight="bold"
        appearance={grayText ? "gray" : "dark"}
      >
        {title}
      </Text>
      <Table>
        <Colgroup>
          {Array(colSpan)
            .fill(null)
            .map((_, index) => (
              <Col key={index} span={1} style={{ width: colWidths[index] }} />
            ))}
        </Colgroup>
        <Thead>
          <Tr border="bottom">
            {tableTitles.map((option, index) => (
              <Th key={index} action={option.action} align="left">
                <Text type="label" size="small" weight="bold">
                  {option.label}
                </Text>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {dataEntries.length > 0 &&
            dataEntries.map((row, rowIndex) => (
              <Tr key={rowIndex} border="bottom">
                {tableTitles.map((header, colIndex) => (
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

function AccountStatementDocument(props: AccountStatementDocumentProps) {
  const {
    userName,
    userIdentification,
    savingsAccountEntries,
    savingsContributionsEntries,
    programmedSavingsEntries,
    commitmentsSavingsEntries,
    obligationsEntries,
    creditCardsEntries,
    credits,
  } = props;

  const creditAttributes = credits.map((item) => {
    const attributes = item.attributes;

    const descriptionValue = `${item.id} - ${item.title}`.toUpperCase();

    return {
      id: item.id,
      description: descriptionValue,
      loanDate: attributes.find((attr) => attr.id === "loan_date")?.value ?? "",
      loanValue: currencyFormat(
        Number(attributes.find((attr) => attr.id === "loan_value")?.value) || 0,
      ),
      cancellationBalance: currencyFormat(
        Number(attributes.find((attr) => attr.id === "total_value")?.value) ||
          0,
      ),
      valueToBeCurrent: currencyFormat(
        Number(attributes.find((attr) => attr.id === "expired_value")?.value) ||
          0,
      ),
      outstandingDues: Number(
        attributes.find((attr) => attr.id === "outstanding_dues")?.value ?? 0,
      ),
      duesPaid: Number(
        attributes.find((attr) => attr.id === "dues_paid")?.value ?? 0,
      ),
      periodicity:
        attributes.find((attr) => attr.id === "periodicity")?.value ?? "",
      interestRate:
        attributes.find((attr) => attr.id === "interest_rate")?.value ?? "",
    };
  });

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
            Estado de cuenta
          </Text>
          <StyledLogo src={logoUrl} />
        </Stack>
        <Stack gap={inube.spacing.s050} direction="column">
          <Stack gap={inube.spacing.s050}>
            <Text type="label" size="small" weight="bold">
              Cliente:
            </Text>
            <Text
              type="label"
              size="small"
            >{`${userIdentification} - ${userName}`}</Text>
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
      </Stack>

      <Text type="label" size="medium" weight="bold" appearance="primary">
        LO QUE TENGO
      </Text>

      {savingsAccountEntries.length > 0 && (
        <TableSection
          title="Cuentas de ahorros"
          tableTitles={savingsTableTitles}
          dataEntries={savingsAccountEntries}
          colSpan={3}
          colWidths={["15%", "70%", "15%"]}
        />
      )}
      {savingsContributionsEntries.length > 0 && (
        <TableSection
          title="Aportes"
          tableTitles={savingsTableTitles}
          dataEntries={savingsContributionsEntries}
          colSpan={3}
          colWidths={["15%", "70%", "15%"]}
        />
      )}
      {programmedSavingsEntries.length > 0 && (
        <TableSection
          title="Ahorros programados"
          tableTitles={savingsTableTitles}
          dataEntries={programmedSavingsEntries}
          colSpan={3}
          colWidths={["15%", "70%", "15%"]}
        />
      )}
      {commitmentsSavingsEntries.length > 0 && (
        <TableSection
          title="Compromisos de ahorro"
          tableTitles={commitmentsTableTitles}
          dataEntries={commitmentsSavingsEntries}
          colSpan={4}
          colWidths={["50%", "20%", "15%", "15%"]}
          grayText
        />
      )}
      <Text type="label" size="medium" weight="bold" appearance="primary">
        LO QUE DEBO
      </Text>
      {obligationsEntries.length > 0 && (
        <>
          <TableSection
            title="Resumen"
            tableTitles={paymentSummaryTitles}
            dataEntries={obligationsEntries}
            colWidths={["70%", "15%", "15%"]}
            colSpan={3}
          />
          <Text type="label" size="medium" weight="bold">
            Detalles
          </Text>
          {creditAttributes.map((credit) => (
            <StyledCardContainer key={credit.id}>
              <Text type="label" size="small" weight="bold" appearance="gray">
                {credit.description}
              </Text>
              <Grid
                templateColumns={`repeat(2, 1fr)`}
                gap={inube.spacing.s100}
                autoRows="auto"
              >
                <BoxAttribute
                  key={credit.loanDate.toString()}
                  label="Fecha de préstamo:"
                  value={credit.loanDate}
                  downloadable
                />
                <BoxAttribute
                  key={credit.loanValue.toString()}
                  label="Monto solicitado:"
                  value={credit.loanValue}
                  downloadable
                />
                <BoxAttribute
                  key={credit.cancellationBalance.toString()}
                  label="Saldo cancelación:"
                  value={credit.cancellationBalance}
                  downloadable
                />
                <BoxAttribute
                  key={credit.valueToBeCurrent.toString()}
                  label="Valor para colocarse al día:"
                  value={credit.valueToBeCurrent}
                  downloadable
                />
                <BoxAttribute
                  key={credit.outstandingDues.toString()}
                  label="Cuotas pendientes:"
                  value={`${credit.outstandingDues} / ${credit.duesPaid + credit.outstandingDues}`}
                  downloadable
                />
                <BoxAttribute
                  key={credit.periodicity.toString()}
                  label="Periodicidad:"
                  value={credit.periodicity}
                  downloadable
                />
                <BoxAttribute
                  key={credit.interestRate.toString()}
                  label="Tasa:"
                  value={credit.interestRate}
                  downloadable
                />
              </Grid>
            </StyledCardContainer>
          ))}
        </>
      )}
      {creditCardsEntries.length > 0 && (
        <TableSection
          title="Tarjetas"
          tableTitles={cardsTableTitles}
          dataEntries={creditCardsEntries}
          colSpan={4}
          colWidths={["25%", "45%", "15%", "15%"]}
          grayText
        />
      )}
      <Stack justifyContent="center">
        <Text type="body" size="small" appearance="gray" textAlign="center">
          Cualquier inquietud, queja o reclamo con este estado de cuenta, podrá
          realizar la radicación de sus solicitudes en la plataforma, mediante
          la opción “Mis PQRS” que se encuentra en el menú lateral. En un
          término de hasta 15 días hábiles, luego de su radicación, daremos
          respuesta a su PQRS.
        </Text>
      </Stack>
    </Stack>
  );
}

export { AccountStatementDocument };
