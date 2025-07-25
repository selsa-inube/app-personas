import { AidCard } from "@components/cards/AidCard";
import { QuickAccess } from "@components/cards/QuickAccess";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs, Grid, Message, Stack, Text } from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";
import { IAid } from "src/model/entity/service";
import { crumbsAids } from "./config/navigation";
import { useQuickLinks } from "@hooks/useQuickLinks";

interface AidOptionsUIProps {
  aids: IAid[];
  loading?: boolean;
  errorMessage?: boolean;
}

function AidOptionsUI(props: AidOptionsUIProps) {
  const { aids, loading, errorMessage } = props;
  const quickLinksArray = useQuickLinks();
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

          {!loading && (
            <>
              {errorMessage ? (
                <Message
                  title="Algo ha salido mal y no fue posible cargar las opciones disponibles para la solicitud de auxilio. Vuelve a intentarlo más tarde."
                  appearance="danger"
                  size={isMobile ? "medium" : "large"}
                  fullwidth
                />
              ) : aids.length === 0 ? (
                <Message
                  title="No hay productos disponibles."
                  appearance="help"
                  size={isMobile ? "medium" : "large"}
                  fullwidth
                />
              ) : (
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
                      type={aid.type}
                    />
                  ))}
                </Grid>
              )}
            </>
          )}
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s300}
          >
            {loading &&
              Array.from({ length: 6 }).map((_, index) => (
                <AidCard
                  id=""
                  title=""
                  type={{
                    id: "",
                    value: "",
                  }}
                  key={index}
                  loading={loading}
                />
              ))}
          </Grid>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinksArray} />}
      </Grid>
    </>
  );
}

export { AidOptionsUI };
