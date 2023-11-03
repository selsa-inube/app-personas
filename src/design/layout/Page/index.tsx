import { useMediaQuery } from "@hooks/useMediaQuery";
import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppContext } from "src/context";
import { Header } from "../../navigation/Header";
import { Nav } from "../../navigation/Nav";
import { Grid } from "../Grid";
import { StyledMain, StyledPage } from "./styles";
import { IHeader, INav } from "./types";

interface PageProps {
  header: IHeader;
  nav: INav;
}

function Page(props: PageProps) {
  const currentLocation = useLocation().pathname;
  const navBreakpoint = useMediaQuery("(min-width: 900px)");
  const { user } = useContext(AppContext);

  const { header, nav } = props;

  return (
    <StyledPage>
      <Header
        logoURL={header.logoURL}
        username={
          user ? `${user.firstName} ${user.firstLastName}` : header.username
        }
        client={header.client}
        links={header.links}
        portalId={header.portalId}
        logoutPath={header.logoutPath}
        logoutTitle={header.logoutTitle}
        navigation={header.navigation}
      />
      <Grid
        templateColumns={navBreakpoint ? "auto 1fr" : "1fr"}
        height="calc(100vh - 53px)"
      >
        {navBreakpoint && (
          <Nav
            title={nav.title}
            sections={nav.sections}
            currentLocation={currentLocation}
            logoutTitle="Cerrar sesión"
            logoutPath=""
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
export type { PageProps };
