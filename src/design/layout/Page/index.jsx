import PropTypes from "prop-types";
import { useLocation, Outlet } from "react-router-dom";

import { Header } from "../../navigation/Header";
import { Nav } from "../../navigation/Nav";

import { StyledPage, StyledContent, StyledMain } from "./styles";

function Page(props) {
  const currentLocation = useLocation().pathname;

  const { header, nav } = props;

  return (
    <StyledPage>
      <Header
        logoURL={header.logoURL}
        username={header.username}
        client={header.client}
      />
      <StyledContent>
        <Nav
          title={nav.title}
          sections={nav.sections}
          currentLocation={currentLocation}
        />
        <StyledMain>
          <Outlet />
        </StyledMain>
      </StyledContent>
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
