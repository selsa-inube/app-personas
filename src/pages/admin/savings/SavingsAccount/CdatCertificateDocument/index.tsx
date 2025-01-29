import { BoxAttribute } from "@components/cards/BoxAttribute";
import { OutlineCard } from "@components/cards/OutlineCard";
import { enviroment } from "@config/enviroment";
import { inube } from "@design/tokens";
import { Grid, Stack, Text } from "@inubekit/inubekit";
import { actionExpirationDM } from "src/model/domains/savings/actionExpirationDM";
import { currencyFormat } from "src/utils/currency";
import { formatLetterDate, formatPrimaryDate } from "src/utils/dates";
import { StyledLogo } from "./styles";
import { useTheme } from "styled-components";

const today = new Date();

interface CdatCertificateDocumentProps {
  productName: string;
  productNumber: string;
  userName: string;
  userIdentification: string;
  amount: number;
  creationDate: string;
  expirationDate: string;
  rate: string;
  periodicity: string;
  deadline: string;
  actionExpiration: string;
}

function CdatCertificateDocument(props: CdatCertificateDocumentProps) {
  const {
    productName,
    productNumber,
    userName,
    userIdentification,
    amount,
    creationDate,
    expirationDate,
    rate,
    periodicity,
    deadline,
    actionExpiration,
  } = props;

  const theme = useTheme();

  return (
    <Stack
      padding={`0 ${inube.spacing.s800}`}
      gap={inube.spacing.s600}
      width="21cm"
      direction="column"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="21cm"
      >
        <Stack direction="column" gap={inube.spacing.s200}>
          <Text type="title" size="medium" weight="bold">
            Certificado - Depósito de ahorro a termino
          </Text>

          <Stack direction="column" gap={inube.spacing.s050}>
            <Stack gap={inube.spacing.s050} alignItems="center">
              <Text type="label" size="small" weight="bold">
                Cliente:
              </Text>

              <Text type="label" size="small" appearance="gray">
                {userIdentification} - {userName.toUpperCase()}
              </Text>
            </Stack>

            <Stack gap={inube.spacing.s050} alignItems="center">
              <Text type="label" size="small" weight="bold">
                Fecha de impresión:
              </Text>

              <Text type="label" size="small" appearance="gray">
                {formatPrimaryDate(today, true)}
              </Text>
            </Stack>
          </Stack>
        </Stack>

        <StyledLogo src={theme.images.logo} />
      </Stack>

      <Text type="body" size="small">
        {formatLetterDate(today)}
      </Text>

      <Stack direction="column" gap={inube.spacing.s025}>
        <Text type="body" size="small">
          Señor(a)
        </Text>

        <Text type="body" size="small">
          A quien pueda interesar
        </Text>
      </Stack>

      <Stack direction="column" gap={inube.spacing.s300}>
        <Text type="body" size="small">
          {enviroment.CLIENT_NAME} informa que a la fecha de expedición de está
          certificación, el producto {productName} con el No {productNumber}, a
          nombre del señor {userName.toUpperCase()} identificado con cédula de
          ciudadanía N° {userIdentification}, se encuentra activo.
        </Text>

        <OutlineCard>
          <Grid
            templateColumns="repeat(3, 1fr)"
            autoRows="auto"
            gap={inube.spacing.s100}
            padding={inube.spacing.s150}
            width="100%"
          >
            <BoxAttribute label="Referencia:" value={productNumber} />

            <BoxAttribute label="Valor:" value={currencyFormat(amount)} />

            <BoxAttribute
              label="Fecha de vencimiento:"
              value={expirationDate}
            />

            <BoxAttribute label="Tasa de interés:" value={rate} />

            <BoxAttribute label="Fecha de apertura:" value={creationDate} />

            <BoxAttribute label="Plazo:" value={deadline} />

            <BoxAttribute label="Pago de intereses:" value={periodicity} />

            <BoxAttribute
              label="Renovar producto al vencimiento:"
              value={
                actionExpirationDM.valueOf(String(actionExpiration || ""))
                  ?.value
              }
            />
          </Grid>
        </OutlineCard>
      </Stack>
    </Stack>
  );
}

export { CdatCertificateDocument };
