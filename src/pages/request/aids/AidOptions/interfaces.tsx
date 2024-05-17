import { AidCard } from "@components/cards/AidCard";
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
import { IAid } from "src/model/entity/service";
import { crumbsAids } from "./config/navigation";

interface AidOptionsUIProps {
  aids: IAid[];
}

function AidOptionsUI(props: AidOptionsUIProps) {
  const { aids } = props;
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsAids} />
        <Title
          title="Solicitud de auxilio"
          subtitle="Genera tu solicitud de auxilios"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>
      <Grid
        gap="s600"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          <Text type="title" size="small">
            Aquí encontraras las opciones que puedes usar para realizar tu
            solicitud de auxilio.
          </Text>
          <Grid templateColumns="1fr 1fr" gap="s300">
            {aids.map((aid) => (
              <AidCard
                key={aid.id}
                title={aid.title}
                description={aid.description}
              />
            ))}
          </Grid>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { AidOptionsUI };
