import { QuickAccess } from "@components/cards/QuickAccess";
import { RequestCard } from "@components/cards/RequestCard";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { savingRequestCards } from "./config/cards";
import { crumbsSavingRequest } from "./config/navigation";
import { useContext } from "react";
import { AppContext } from "src/context/app";
import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { Text } from "@inubekit/text";

function SavingRequest() {
  const navigate = useNavigate();
  const { getFlag } = useContext(AppContext);

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  const handleCardNavigate = (path: string) => {
    navigate(`/savings/${path}`);
  };

  if (!getFlag("admin.savings.savings.request-saving").value) {
    return <Navigate to="/" />;
  }

  const filteredCards = savingRequestCards.filter((card) => {
    if (card.id === "savingsAccount") {
      return getFlag("request.savings.savings.request-savings-account").value;
    }
    if (card.id === "CDAT") {
      return getFlag("request.savings.savings.request-cdat").value;
    }
    if (card.id === "programmedSavings") {
      return getFlag("request.savings.savings.request-programmed-savings")
        .value;
    }
    return false;
  });

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsSavingRequest} />
        <Title
          title="Solicitud de ahorro"
          subtitle="Genera tu solicitud de ahorro"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      <Grid
        gap={inube.spacing.s600}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
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
            {filteredCards.map((card, index) => (
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
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { SavingRequest };
