import { User } from "../../data/User";

import {
  StyledHeader,
  StyledLogoContainer,
  StyledLogo,
  StyledUser,
} from "./styles";

interface HeaderProps {
  logoURL?: string;
  username: string;
  client?: string;
}

function Header(props: HeaderProps) {
  const { logoURL, username, client } = props;

  return (
    <StyledHeader>
      <StyledLogoContainer to="/">
        <StyledLogo src={logoURL} />
      </StyledLogoContainer>
      <StyledUser>
        <User username={username} client={client} />
      </StyledUser>
    </StyledHeader>
  );
}

export { Header };
export type { HeaderProps };
