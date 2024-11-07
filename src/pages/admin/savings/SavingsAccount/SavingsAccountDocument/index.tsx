import { logoUrl } from "@config/header";
import { StyledLogo } from "@design/navigation/Header/styles";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { formatPrimaryDate } from "src/utils/dates";

interface SavingsAccountDocumentProps {
  username: string;
  userIdentification: string;
}

const today = new Date();

function SavingsAccountDocument(props: SavingsAccountDocumentProps) {
  const { username, userIdentification } = props;

  return (
    <Stack gap={inube.spacing.s200} direction="column">
      <Stack height="30px" justifyContent="space-between" alignItems="center">
        <Text type="title" size="medium" weight="bold">
          Extracto cuenta de ahorros
        </Text>
        <Stack>
          <StyledLogo src={logoUrl} />
        </Stack>
      </Stack>
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
    </Stack>
  );
}

export { SavingsAccountDocument };
