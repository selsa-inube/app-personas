import PropTypes from "prop-types";

import { User } from "../../data/User";

import { StyledHeader, StyledLogo, StyledUser } from "./styles";

function Header({ logoURL, username, businessUnit }) {
  return (
    <StyledHeader>
      <StyledLogo src={logoURL} />
      <StyledUser>
        <User username={username} businessUnit={businessUnit} />
      </StyledUser>
    </StyledHeader>
  );
}

Header.propTypes = {
  logoURL: PropTypes.string,
  username: PropTypes.string.isRequired,
  businessUnit: PropTypes.string,
};

export { Header };
