import { logoUrl } from "@config/header";
import { Table } from "@design/data/Table";
import { StyledLogo } from "@design/navigation/Header/styles";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { formatPrimaryDate } from "src/utils/dates";
import { cardsTableTitles, commitmentsTableTitles, paymentSummaryTitles, savingsTableTitles } from "../config/tables";
import { IEntry } from "@design/data/Table/types";

const today = new Date();

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

function AccountStatementDocument(props: AccountStatementDocumentProps) {
  const {
    userName,
    paymentMethod,
    userIdentification,
    savingsAccountEntries,
    savingsContributionsEntries,
    programmedSavingsEntries,
    commitmentsSavingsEntries,
    obligationsEntries,
    creditCardsEntries,
  } = props;
  return (
    <Stack
      padding={`${inube.spacing.s400}`}
      gap={inube.spacing.s200}
      width="225mm"
      direction="column"
    >
      <Stack gap={inube.spacing.s200} direction="column">
        <Stack height="30px" justifyContent="space-between" alignItems="center">
          <Text type="title" size="medium" weight="bold">
            Estado de cuenta
          </Text>
          <Stack justifyContent="flex-end">
            <StyledLogo src={logoUrl} />
          </Stack>
        </Stack>
        <Stack
          gap={inube.spacing.s050}
          justifyContent="flex-start"
          direction="column"
        >
          <Stack gap={inube.spacing.s050}>
            <Text type="label" size="small" weight="bold">
              Cliente:
            </Text>
            <Text type="label" size="small">
              {`${userIdentification} - ${userName}`}
            </Text>
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

      <Stack gap={inube.spacing.s200} direction="column">
        <Text type="label" size="medium" weight="bold" appearance="gray">
          Lo que tengo
        </Text>

        <Text type="label" size="medium" weight="bold">
          Cuenta de ahorros
        </Text>
        <Table titles={savingsTableTitles} entries={savingsAccountEntries} />

        <Text type="label" size="medium" weight="bold">
          Aportes
        </Text>
        <Table
          titles={savingsTableTitles}
          entries={savingsContributionsEntries}
        />

        <Text type="label" size="medium" weight="bold">
          Ahorro programado
        </Text>
        <Table titles={savingsTableTitles} entries={programmedSavingsEntries} />
      </Stack>

      <Stack gap={inube.spacing.s200} direction="column">
        <Text type="label" size="medium" weight="bold" appearance="gray">
          Compromisos de ahorro
        </Text>
        <Table titles={commitmentsTableTitles} entries={commitmentsSavingsEntries} />
      </Stack>

      <Stack gap={inube.spacing.s200} direction="column">
        <Text type="label" size="medium" weight="bold" appearance="gray">
          Lo que debo
        </Text>

        <Text type="label" size="medium" weight="bold">
          Resumen
        </Text>
        <Table titles={paymentSummaryTitles} entries={obligationsEntries} />

        <Text type="label" size="medium" weight="bold">
          Detalles
        </Text>
      </Stack>

      <Stack gap={inube.spacing.s200} direction="column">
        <Text type="label" size="medium" weight="bold" appearance="gray">
          Tarjetas
        </Text>
        <Table titles={cardsTableTitles} entries={creditCardsEntries || []} />
      </Stack>

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
