import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Text } from "@design/data/Text";
import { Title } from "@design/data/Title";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack } from "react-icons/md";
import { crumbsCreditRequest } from "./config/navigation";

interface CreditRequestProps {}

function CreditRequest(props: CreditRequestProps) {
  const {} = props;

  const mquery = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsCreditRequest} />
        <Title
          title="Solicitud de crédito"
          subtitle="Genera tu solicitud de crédito"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      <Grid
        gap="s600"
        margin={
          mquery ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={mquery ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s400">
          <Text type="title" size="small">
            Aquí encontraras las opciones que puedes usar para realizar tu
            solicitud de crédito.
          </Text>

          <Stack direction="column" gap="s300">
            
          </Stack>
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CreditRequest };
