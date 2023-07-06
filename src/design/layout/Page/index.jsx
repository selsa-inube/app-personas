import PropTypes from "prop-types";
import { Header } from "../../navigation/Header";
import { Nav } from "../../navigation/Nav";

import { StyledPage, StyledContent } from "./styles";

function Page(props) {
  const { header, nav, currentLocation } = props;

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
        <main></main>
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
  currentLocation: PropTypes.string.isRequired,
};

export { Page };
