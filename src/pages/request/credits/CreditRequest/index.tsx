import { QuickAccess } from "@components/cards/QuickAccess";
import { RequestCard } from "@components/cards/RequestCard";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs, Grid, Stack, Text } from "@inubekit/inubekit";
import { useContext } from "react";
import { MdArrowBack } from "react-icons/md";
import { Navigate, useNavigate } from "react-router";
import { AppContext } from "src/context/app";
import { creditRequestCards } from "./config/cards";
import { crumbsCreditRequest } from "./config/navigation";
import { useQuickLinks } from "@hooks/useQuickLinks";

function CreditRequest() {
  const navigate = useNavigate();
  const { getFlag } = useContext(AppContext);
  const quickLinksArray = useQuickLinks();

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  const handleCardNavigate = (path: string) => {
    navigate(`/credits/${path}`);
  };

  if (!getFlag("admin.credits.credits.request-credit").value) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsCreditRequest} />
        <Title
          title="Solicitud de crédito"
          subtitle="Genera tu solicitud de crédito"
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
        <Stack
          direction="column"
          gap={isDesktop ? inube.spacing.s400 : inube.spacing.s250}
        >
          <Text type="title" size="small">
            Aquí encontraras las opciones que puedes usar para realizar tu
            solicitud de crédito.
          </Text>

          <Stack direction="column" gap={inube.spacing.s300}>
            {creditRequestCards.map((card, index) => (
              <RequestCard
                key={index}
                title={card.title}
                descriptions={card.descriptions}
                actionText="Solicitar"
                onClick={() => handleCardNavigate(card.navigateTo)}
              />
            ))}
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinksArray} />}
      </Grid>
    </>
  );
}

export { CreditRequest };
