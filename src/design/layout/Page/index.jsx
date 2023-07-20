import PropTypes from "prop-types";
import { useLocation, Outlet } from "react-router-dom";

import { useMediaQuery } from "../../../hooks/useMediaQuery";

import { Header } from "../../navigation/Header";
import { Nav } from "../../navigation/Nav";
import { Grid } from "../Grid";

import { StyledPage, StyledMain } from "./styles";

function Page(props) {
  const currentLocation = useLocation().pathname;
  const navBreakpoint = useMediaQuery("(min-width: 900px)");

  const { header, nav } = props;

  return (
    <StyledPage>
      <Header
        logoURL={header.logoURL}
        username={header.username}
        client={header.client}
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
          />
        )}
        <StyledMain>
          <Outlet />
        </StyledMain>
      </Grid>
    </StyledPage>
  );
}

Page.propTypes = {
  header: PropTypes.shape({
    logoURL: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    client: PropTypes.string,
  }),
  nav: PropTypes.shape({
    title: PropTypes.string,
    sections: PropTypes.array,
  }),
};

export { Page };
