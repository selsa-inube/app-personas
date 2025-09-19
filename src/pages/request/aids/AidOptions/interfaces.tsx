import { AidCard } from "@components/cards/AidCard";
import { QuickAccess } from "@components/cards/QuickAccess";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs, Button, Grid, Message, Stack, Text } from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";
import { IAid } from "src/model/entity/service";
import { crumbsAids } from "./config/navigation";
import { useQuickLinks } from "@hooks/useQuickLinks";
import { StyledScrollbar } from "@components/cards/AidCard/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [aidSelected, setAidSelected] = useState<string>("");

  const navigate = useNavigate();

  const messageSize = isMobile ? "medium" : "large";
  const gridProps = {
    templateColumns: "repeat(1, 1fr)",
    autoRows: "auto",
    gap: inube.spacing.s150,
    padding: inube.spacing.s200,
  };

  const goToAid = () => {
    if (!aidSelected) return;
    navigate(`/aids/${aidSelected}`, {
      state: { id: aidSelected },
    });
  };

  const getContentAux = () => {
    if (loading) return <Grid {...gridProps}>
      {Array.from({ length: 4 }, (_, index) => (
        <AidCard
          key={`skeleton-${index}`}
          id=""
          title=""
          loading={true}
        />
      ))}
    </Grid>;
    if (errorMessage) return <Message
      title="Algo ha salido mal y no fue posible cargar las opciones disponibles para la solicitud de auxilio. Vuelve a intentarlo más tarde."
      appearance="danger"
      size={messageSize}
      fullwidth
    />;
    if (aids.length === 0) return <Message
      title="No hay productos disponibles."
      appearance="help"
      size={messageSize}
      fullwidth
    />;
    return <StyledScrollbar>
      <Grid {...gridProps} height="80%">
        {aids.map((aid) => (
          <AidCard
            key={aid.id}
            id={aid.id}
            title={aid.title}
            onSelect={setAidSelected}
            selected={aidSelected === aid.id}
          />
        ))}
      </Grid>
    </StyledScrollbar>;
  };

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
          {getContentAux()}
          {
            aids.length > 0 &&
            <Stack justifyContent="flex-end" width="100%">
              <Button onClick={goToAid} disabled={!aidSelected} spacing="compact">
                Solicitar
              </Button>
            </Stack>
          }
        </Stack>
        {isDesktop && <QuickAccess links={quickLinksArray} />}
      </Grid>
    </>
  );
}

export { AidOptionsUI };
