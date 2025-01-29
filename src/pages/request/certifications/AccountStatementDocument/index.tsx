import { BoxAttribute } from "@components/cards/BoxAttribute";
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
import { IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";
import {
  cardsTableTitles,
  commitmentsTableTitles,
  paymentSummaryTitles,
  savingsTableTitles,
} from "../config/tables";
import { StyledCardContainer, StyledLogo } from "./styles";
import { useTheme } from "styled-components";

const today = new Date();

interface AccountStatementDocumentProps {
  userName: string;
  userIdentification: string;
  savingsAccountEntries: IEntry[];
  savingsContributionsEntries: IEntry[];
  programmedSavingsEntries: IEntry[];
  cdatSavingsEntries: IEntry[];
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
    cdatSavingsEntries,
    commitmentsSavingsEntries,
    obligationsEntries,
    creditCardsEntries,
    credits,
  } = props;

  const theme = useTheme();

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
      padding={`0 ${inube.spacing.s400}`}
      gap={inube.spacing.s200}
      width="225mm"
      direction="column"
    >
      <Stack gap={inube.spacing.s200} direction="column">
        <Stack justifyContent="space-between" alignItems="center">
          <Stack direction="column" gap={inube.spacing.s200}>
            <Text type="title" size="medium" weight="bold">
              Estado de cuenta
            </Text>
            <Stack gap={inube.spacing.s050} direction="column">
              {[
                {
                  label: "Cliente",
                  value: `${userIdentification} - ${userName}`,
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
          <StyledLogo src={theme.images.logo} />
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
      {cdatSavingsEntries.length > 0 && (
        <TableSection
          title="CDATs"
          tableTitles={savingsTableTitles}
          dataEntries={cdatSavingsEntries}
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
          Si presenta inquietudes, quejas o reclamos con el presente estado de
          cuenta, por favor realizar la radicación de sus solicitudes en la
          Oficina Virtual mediante la opción &quot;Mis PQRS&quot; que se
          encuentra en el menú. Estas solicitudes recibirán respuesta en un
          plazo máximo de 15 días hábiles, posterior a su radicación.
        </Text>
      </Stack>
    </Stack>
  );
}

export { AccountStatementDocument };
