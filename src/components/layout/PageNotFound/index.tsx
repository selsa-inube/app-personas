import { getHeader } from "@config/header";
import { getNav } from "@config/nav";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Header } from "@design/navigation/Header";
import { Nav } from "@design/navigation/Nav";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useContext } from "react";
import { MdOutlineSentimentNeutral } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { AppContext } from "src/context/app";
import { capitalizeEachWord } from "src/utils/texts";
import { StyledMain, StyledPage } from "./styles";

function PageNotFound() {
  const { pathname: currentLocation } = useLocation();
  const isTablet = useMediaQuery("(min-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 550px)");

  const { user } = useContext(AppContext);
  const { getFlag } = useContext(AppContext);

  const withSavingRequest = getFlag(
    "admin.savings.savings.request-saving",
  ).value;
  const withCreditRequest = getFlag(
    "admin.credits.credits.request-credit",
  ).value;
  const withEventRequest = getFlag("request.events.events.request-event").value;
  const withAidRequest = getFlag("request.aids.aids.request-aid").value;
  const withHolidaysRequest = getFlag(
    "request.holidays.holidays.request-holidays",
  ).value;
  const withRechargeDeposit = getFlag(
    "admin.transfers.recharge.recharge-deposit"
  ).value;

  const header = getHeader(
    getFlag("general.links.update-data.update-data-with-assisted").value,
    getFlag("general.links.update-data.update-data-without-assisted").value,
    withSavingRequest,
    withCreditRequest,
    withEventRequest,
    withAidRequest,
    withHolidaysRequest,
    withRechargeDeposit
  );

  const nav = getNav(
    withSavingRequest,
    withCreditRequest,
    withEventRequest,
    withAidRequest,
    withHolidaysRequest,
    withRechargeDeposit
  );

  const username = capitalizeEachWord(
    `${user.firstName} ${user.firstLastName}`,
  );

  const fullName = capitalizeEachWord(
    `${user.firstName} ${user.secondName || ""} ${user.firstLastName} ${
      user.secondLastName || ""
    }`,
  );

  return (
    <StyledPage>
      <Header
        logoURL={header.logoURL}
        username={username}
        fullName={fullName}
        businessUnit={header.businessUnit}
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
