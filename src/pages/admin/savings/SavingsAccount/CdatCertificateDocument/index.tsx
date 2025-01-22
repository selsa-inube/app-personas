import { OutlineCard } from "@components/cards/OutlineCard";
import { logoUrl } from "@config/header";
import { StyledLogo } from "@design/navigation/Header/styles";
import { inube } from "@design/tokens";
import { Grid, Stack, Text } from "@inubekit/inubekit";
import { currencyFormat } from "src/utils/currency";
import { formatLetterDate } from "src/utils/dates";
import { capitalizeText } from "src/utils/texts";

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
  } = props;

  return (
    <Stack
      padding={`${inube.spacing.s600} ${inube.spacing.s800}`}
      gap={inube.spacing.s600}
      width="21cm"
      direction="column"
    >
      <Stack justifyContent="flex-start" width="100%">
        <StyledLogo src={logoUrl} />
      </Stack>

      <Text type="title" size="large" weight="bold">
        Certificado - {capitalizeText(productName)}
      </Text>

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
          Fondecom S.A informa que a la fecha de expedición de está
          certificación, el producto {productName} con el No {productNumber}, a
          nombre del señor {userName.toUpperCase()} identificado con cédula de
          ciudadanía N° {userIdentification}, se encuentra activo.
        </Text>

        <OutlineCard>
          <Grid
            templateColumns="1fr 1fr"
            autoRows="auto"
            gap={inube.spacing.s100}
            padding={inube.spacing.s150}
            width="100%"
          >
            <Stack gap={inube.spacing.s050} alignItems="center">
              <Text type="label" size="small" weight="bold">
                Referencia:
              </Text>

              <Text type="body" size="small" appearance="gray">
                {productNumber}
              </Text>
            </Stack>

            <Stack gap={inube.spacing.s050} alignItems="center">
              <Text type="label" size="small" weight="bold">
                Valor:
              </Text>

              <Text type="body" size="small" appearance="gray">
                {currencyFormat(amount)}
              </Text>
            </Stack>

            <Stack gap={inube.spacing.s050} alignItems="center">
              <Text type="label" size="small" weight="bold">
                Fecha de apertura:
              </Text>

              <Text type="body" size="small" appearance="gray">
                {creationDate}
              </Text>
            </Stack>

            <Stack gap={inube.spacing.s050} alignItems="center">
              <Text type="label" size="small" weight="bold">
                Fecha de vencimiento:
              </Text>

              <Text type="body" size="small" appearance="gray">
                {expirationDate}
              </Text>
            </Stack>

            <Stack gap={inube.spacing.s050} alignItems="center">
              <Text type="label" size="small" weight="bold">
                Tasa de interés:
              </Text>

              <Text type="body" size="small" appearance="gray">
                {rate}
              </Text>
            </Stack>

            <Stack gap={inube.spacing.s050} alignItems="center">
              <Text type="label" size="small" weight="bold">
                Pago de intereses:
              </Text>

              <Text type="body" size="small" appearance="gray">
                {periodicity}
              </Text>
            </Stack>

            <Stack gap={inube.spacing.s050} alignItems="center">
              <Text type="label" size="small" weight="bold">
                Plazo:
              </Text>

              <Text type="body" size="small" appearance="gray">
                {deadline}
              </Text>
            </Stack>
          </Grid>
        </OutlineCard>
      </Stack>
    </Stack>
  );
}

export { CdatCertificateDocument };
