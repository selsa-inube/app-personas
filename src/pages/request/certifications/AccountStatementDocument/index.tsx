import { logoUrl } from "@config/header";
import { Table } from "@design/data/Table";
import { StyledLogo } from "@design/navigation/Header/styles";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { formatLetterDate } from "src/utils/dates";
import { savingsTableTitles } from "../config/tables";
import { IEntry } from "@design/data/Table/types";

const today = new Date();

interface AccountStatementDocumentProps {
  userName: string;
  userIdentification: string;
  savingsAccountEntries: IEntry[];
  savingsContributionsEntries: IEntry[];
  programmedSavingsEntries: IEntry[];
}

function AccountStatementDocument(props: AccountStatementDocumentProps) {
  const {
    userName,
    userIdentification,
    savingsAccountEntries,
    savingsContributionsEntries,
    programmedSavingsEntries,
  } = props;
  return (
    <Stack
      padding={`${inube.spacing.s400}`}
      gap={inube.spacing.s250}
      width="225mm"
      direction="column"
    >
      <Stack gap={inube.spacing.s200} direction="column" width="100%">
        <Stack
          height="30px"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
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
              30 - FONDECOM MENSUAL
            </Text>
          </Stack>
          <Stack gap={inube.spacing.s050}>
            <Text type="label" size="small" weight="bold">
              Fecha de impresión:
            </Text>
            <Text type="label" size="small">
              {formatLetterDate(today)}
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={inube.spacing.s200} direction="column" width="100%">
        <Text type="label" size="medium" weight="bold" appearance="gray">
          Lo que tengo
        </Text>
        <Text type="label" size="medium" weight="bold">
          Cuenta de ahorros
        </Text>
        <Text textAlign="start">
          <Table titles={savingsTableTitles} entries={savingsAccountEntries} />
        </Text>
        <Text type="label" size="medium" weight="bold">
          Aportes
        </Text>
        <Table
          titles={savingsTableTitles}
          entries={savingsContributionsEntries}
        />
        <Text type="label" size="medium" weight="bold">
          Ahorro programadocrojas
        </Text>
        <Table titles={savingsTableTitles} entries={programmedSavingsEntries} />
        <Text type="label" size="medium" weight="bold" appearance="gray">
          Compromisos de ahorro
        </Text>
      </Stack>
      <Stack gap={inube.spacing.s200} direction="column" width="100%">
        <Text type="label" size="medium" weight="bold" appearance="gray">
          Lo que debo
        </Text>
        <Text type="label" size="medium" weight="bold">
          Resumen
        </Text>
        <Text type="label" size="medium" weight="bold">
          Detalles
        </Text>
      </Stack>
      <Stack gap={inube.spacing.s200} direction="column" width="100%">
        <Text type="label" size="medium" weight="bold" appearance="gray">
          Tarjetas
        </Text>
      </Stack>

      <Stack>
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
