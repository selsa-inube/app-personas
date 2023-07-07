import PropTypes from "prop-types";

import { User } from "../../data/User";

import { StyledHeader, StyledLogo, StyledUser } from "./styles";

function Header(props) {
  const { logoURL, username, client } = props;

  return (
    <StyledHeader>
      <StyledLogo src={logoURL} />
      <StyledUser>
        <User username={username} client={client} />
      </StyledUser>
    </StyledHeader>
  );
}

Header.propTypes = {
  logoURL: PropTypes.string,
  username: PropTypes.string.isRequired,
  client: PropTypes.string,
};

export { Header };
