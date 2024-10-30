import { logoUrl } from "@config/header";
import { StyledLogo } from "@design/navigation/Header/styles";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { formatPrimaryDate } from "src/utils/dates";
import {
  cardsTableTitles,
  commitmentsTableTitles,
  paymentSummaryTitles,
  savingsTableTitles,
} from "../config/tables";
import { IEntry } from "@design/data/Table/types";
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
const NO_DATA_MESSAGE = "Actualmente no tienes productos para mostrar.";

interface AccountStatementDocumentProps {
  userName: string;
  paymentMethod: string;
  userIdentification: string;
  savingsAccountEntries: IEntry[];
  savingsContributionsEntries: IEntry[];
  programmedSavingsEntries: IEntry[];
  commitmentsSavingsEntries: IEntry[];
  obligationsEntries: IEntry[];
  creditCardsEntries: IEntry[];
}

interface TableSectionProps {
  title: string;
  tableTitles: { id: string; label: string; action?: boolean }[];
  dataEntries: IEntry[];
  colSpan: number;
  grayText?: boolean;
}

function TableSection({
  title,
  tableTitles,
  dataEntries,
  colSpan,
  grayText = false,
}: TableSectionProps) {
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
              <Col key={index} span={1} />
            ))}
        </Colgroup>
        <Thead>
          <Tr border="bottom">
            {tableTitles.map((option, index) => (
              <Th key={index} action={option.action} align="center">
                <Text type="label" size="small" weight="bold">
                  {option.label}
                </Text>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {dataEntries.length > 0 ? (
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
            ))
          ) : (
            <Tr border="bottom">
              <Td colSpan={colSpan} align="left">
                <Text type="label" size="small">
                  {NO_DATA_MESSAGE}
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Stack>
  );
}

function AccountStatementDocument({
  userName,
  paymentMethod,
  userIdentification,
  savingsAccountEntries,
  savingsContributionsEntries,
  programmedSavingsEntries,
  commitmentsSavingsEntries,
  obligationsEntries,
  creditCardsEntries,
}: AccountStatementDocumentProps) {
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
              Medio de pago:
            </Text>
            <Text type="label" size="small">
              {paymentMethod}
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
      </Stack>

      <Text type="label" size="medium" weight="bold" appearance="gray">
        Lo que tengo
      </Text>

      <TableSection
        title="Cuenta de ahorros"
        tableTitles={savingsTableTitles}
        dataEntries={savingsAccountEntries}
        colSpan={3}
      />
      <TableSection
        title="Aportes"
        tableTitles={savingsTableTitles}
        dataEntries={savingsContributionsEntries}
        colSpan={3}
      />
      <TableSection
        title="Ahorro programado"
        tableTitles={savingsTableTitles}
        dataEntries={programmedSavingsEntries}
        colSpan={3}
      />
      <TableSection
        title="Compromisos de ahorro"
        tableTitles={commitmentsTableTitles}
        dataEntries={commitmentsSavingsEntries}
        colSpan={4}
        grayText
      />
      <Text type="label" size="medium" weight="bold" appearance="gray">
        Lo que tengo
      </Text>
      <TableSection
        title="Resumen"
        tableTitles={paymentSummaryTitles}
        dataEntries={obligationsEntries}
        colSpan={3}
      />
      {obligationsEntries.length > 0 && (
        <Text type="label" size="medium" weight="bold">
          Detalles
        </Text>
      )}
      <TableSection
        title="Tarjetas"
        tableTitles={cardsTableTitles}
        dataEntries={creditCardsEntries}
        colSpan={4}
        grayText
      />
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
