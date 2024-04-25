import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@inube/auth";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getHeader } from "@config/header";
import { AppContext } from "src/context/app";
import { Nav } from "@design/navigation/Nav";
import { Header } from "@design/navigation/Header";
import { Grid } from "@design/layout/Grid";
import { INav } from "@design/layout/Page/types";
import { Stack } from "@design/layout/Stack";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { capitalizeFirstLetters } from "src/utils/texts";
import { MdOutlineSentimentNeutral } from "react-icons/md";
import { StyledMain, StyledPage } from "./styles";

interface PageNotFoundProps {
  nav: INav;
}

function PageNotFound(props: PageNotFoundProps) {
  const currentLocation = useLocation().pathname;
  const isTablet = useMediaQuery("(min-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 550px)");

  const { nav } = props;
  const { user } = useAuth();
  const { getFlag } = useContext(AppContext);

  const header = getHeader(
    getFlag("general.links.update-data.update-data-with-assisted")?.value ||
      false,
    getFlag("general.links.update-data.update-data-without-assisted")?.value ||
      false,
  );
  return (
    <StyledPage>
      <Header
        logoURL={header.logoURL}
        username={capitalizeFirstLetters(
          `${user?.firstName} ${user?.firstLastName}`,
        )}
        fullName={capitalizeFirstLetters(
          `${user?.firstName} ${user?.secondName || ""} ${user?.firstLastName} ${user?.secondLastName || ""}`,
        )}
        client={header.client}
        links={header.links}
        portalId={header.portalId}
        logoutTitle={header.logoutTitle}
        navigation={header.navigation}
      />
      <Grid
        templateColumns={isTablet ? "auto 1fr" : "1fr"}
        height="calc(100vh - 53px)"
      >
        {isTablet && (
          <Nav
            title={nav.title}
            sections={nav.sections}
            currentLocation={currentLocation}
            logoutTitle="Cerrar sesión"
          />
        )}
        <StyledMain>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={isMobile ? "s300" : "s400"}
          >
            <Icon
              appearance="gray"
              icon={<MdOutlineSentimentNeutral />}
              size={isMobile ? "40px" : "60px"}
              spacing="none"
            />
            <Stack
              direction="column"
              gap="s200"
              alignItems="center"
              width={isMobile ? "312px" : "500px"}
            >
              <Text
                type="title"
                size={isMobile ? "small" : "large"}
                textAlign="center"
              >
                Recurso no disponible
              </Text>
              <Text
                type={isMobile ? "body" : "title"}
                size={isMobile ? "small" : "medium"}
                appearance="gray"
                textAlign="center"
              >
                La pagina que estás buscando no se encuentra disponible.
              </Text>
            </Stack>
            <Button
              variant="none"
              type="link"
              path="/"
              spacing={isMobile ? "compact" : "wide"}
            >
              Volver al inicio
            </Button>
          </Stack>
        </StyledMain>
      </Grid>
    </StyledPage>
  );
}

export { PageNotFound };
