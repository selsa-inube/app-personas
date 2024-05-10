import { getHeader } from "@config/header";
import { getNav } from "@config/nav";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppContext } from "src/context/app";
import { capitalizeFirstLetters } from "src/utils/texts";
import { Header } from "../../navigation/Header";
import { Nav } from "../../navigation/Nav";
import { Grid } from "../Grid";
import { StyledMain, StyledPage } from "./styles";

function Page() {
  const currentLocation = useLocation().pathname;
  const isTablet = useMediaQuery("(min-width: 900px)");

  const { user } = useAuth();
  const { getFlag } = useContext(AppContext);

  const withSavingRequest = getFlag(
    "admin.savings.savings.request-saving",
  ).value;
  const withCreditRequest = getFlag(
    "admin.credits.credits.request-credit",
  ).value;
  const withEventRequest = getFlag("request.events.events.request-event").value;
  const withHolidaysRequest = getFlag(
    "request.holidays.holidays.request-holidays",
  ).value;

  const header = getHeader(
    getFlag("general.links.update-data.update-data-with-assisted").value,
    getFlag("general.links.update-data.update-data-without-assisted").value,
    withSavingRequest,
    withCreditRequest,
    withEventRequest,
    withHolidaysRequest,
  );

  console.log(getFlag("request.events.events.request-event"));

  const nav = getNav(
    withSavingRequest,
    withCreditRequest,
    withEventRequest,
    withHolidaysRequest,
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
            sections={nav.sections}
            currentLocation={currentLocation}
            logoutTitle="Cerrar sesión"
          />
        )}
        <StyledMain>
          <Outlet />
        </StyledMain>
      </Grid>
    </StyledPage>
  );
}

export { Page };
