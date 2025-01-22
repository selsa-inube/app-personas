import { QuickAccess } from "@components/cards/QuickAccess";
import { RequestCard } from "@components/cards/RequestCard";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Grid, Stack, Text } from "@inubekit/inubekit";
import { useContext, useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { getCdatProducts } from "src/services/iclient/savings/getCdatProducts";
import { savingRequestCards } from "./config/cards";
import { crumbsSavingRequest } from "./config/navigation";

function SavingRequest() {
  const navigate = useNavigate();
  const { getFlag } = useContext(AppContext);
  const [cards, setCards] = useState(savingRequestCards);

  const { accessToken } = useAuth();

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  const handleCardNavigate = (path: string) => {
    navigate(`/savings/${path}`);
  };

  const getCdatProduct = async () => {
    if (!accessToken) return;

    getCdatProducts(accessToken).then((cdats) => {
      if (cdats.length > 0) {
        setCards((prev) =>
          prev.map((card) => {
            if (card.type === "cdat") {
              return {
                ...card,
                id: cdats[0].id,
                title: cdats[0].title,
              };
            }
            return card;
          }),
        );
      }
    });
  };

  useEffect(() => {
    getCdatProduct();
  }, [accessToken]);

  if (!getFlag("admin.savings.savings.request-saving").value) {
    return <Navigate to="/" />;
  }

  const filteredCards = cards.filter((card) => {
    if (card.type === "account") {
      return getFlag("request.savings.savings.request-savings-account").value;
    }
    if (card.type === "cdat") {
      return getFlag("request.savings.savings.request-cdat").value;
    }
    if (card.type === "programmedSaving") {
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
            solicitud de ahorro.
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
