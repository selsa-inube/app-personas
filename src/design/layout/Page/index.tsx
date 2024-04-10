import { getHeader } from "@config/header";
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
import { INav } from "./types";

interface PageProps {
  nav: INav;
}

function Page(props: PageProps) {
  const currentLocation = useLocation().pathname;
  const isTablet = useMediaQuery("(min-width: 900px)");

  const { nav } = props;
  const { user } = useAuth();
  const { featuredFlags } = useContext(AppContext);

  const header = getHeader(featuredFlags);

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
          <Outlet />
        </StyledMain>
      </Grid>
    </StyledPage>
  );
}

export { Page };
export type { PageProps };
