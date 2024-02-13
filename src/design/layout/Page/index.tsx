import { useLocation, Outlet } from "react-router-dom";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Header } from "../../navigation/Header";
import { Nav } from "../../navigation/Nav";
import { Grid } from "../Grid";
import { StyledPage, StyledMain } from "./styles";
import { IHeader, INav } from "./types";
import { useAuth } from "@inube/auth";
import { capitalizeFirstLetters } from "src/utils/texts";

interface PageProps {
  header: IHeader;
  nav: INav;
}

function Page(props: PageProps) {
  const currentLocation = useLocation().pathname;
  const isTablet = useMediaQuery("(min-width: 900px)");

  const { header, nav } = props;
  const { user } = useAuth();

  return (
    <StyledPage>
      <Header
        logoURL={header.logoURL}
        username={capitalizeFirstLetters(
          `${user?.firstName} ${user?.firstLastName}`
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
