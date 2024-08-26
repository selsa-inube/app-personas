import { AidCard } from "@components/cards/AidCard";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack } from "react-icons/md";
import { IAid } from "src/model/entity/service";
import { crumbsAids } from "./config/navigation";
import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { Text } from "@inubekit/text";

interface AidOptionsUIProps {
  aids: IAid[];
}

function AidOptionsUI(props: AidOptionsUIProps) {
  const { aids } = props;
  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsAids} />
        <Title
          title="Solicitud de auxilio"
          subtitle="Genera tu solicitud de auxilios"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>
      <Grid
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack direction="column" gap={inube.spacing.s300}>
          <Text type="title" size="small">
            Aquí encontraras las opciones que puedes usar para realizar tu
            solicitud de auxilio.
          </Text>
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s300}
          >
            {aids.map((aid) => (
              <AidCard
                key={aid.id}
                id={aid.id}
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
