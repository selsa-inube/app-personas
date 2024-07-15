import { getHeader } from "@config/header";
import { getNav } from "@config/nav";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppContext } from "src/context/app";
import { capitalizeEachWord } from "src/utils/texts";
import { Header } from "../../navigation/Header";
import { Nav } from "../../navigation/Nav";
import { Grid } from "../Grid";
import { StyledMain, StyledPage } from "./styles";

interface PageProps {
  withNav?: boolean;
}

function Page(props: PageProps) {
  const { withNav = true } = props;
  const currentLocation = useLocation().pathname;
  const isTablet = useMediaQuery("(min-width: 900px)");

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
  const withTransfers = getFlag(
    "admin.transfers.deposit.deposit-accounts",
  ).value;
  const withMyRequests = getFlag("admin.requests.requests.my-requests").value;

  const nav = getNav(
    withSavingRequest,
    withCreditRequest,
    withEventRequest,
    withAidRequest,
    withHolidaysRequest,
    withTransfers,
    withMyRequests,
  );

  const header = getHeader(
    getFlag("general.links.update-data.update-data-with-assisted").value,
    getFlag("general.links.update-data.update-data-without-assisted").value,
    nav,
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
      {withNav ? (
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
      ) : (
        <StyledMain>
          <Outlet />
        </StyledMain>
      )}
    </StyledPage>
  );
}

export { Page };
