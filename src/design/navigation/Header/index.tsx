import { useMediaQuery } from "@hooks/useMediaQuery";
import { User } from "../../data/User";

import {
  StyledHeader,
  StyledLogo,
  StyledLogoContainer,
  StyledUser,
} from "./styles";

interface HeaderProps {
  logoURL?: string;
  username: string;
  client?: string;
}

function Header(props: HeaderProps) {
  const { logoURL, username, client } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <StyledHeader>
      <StyledLogoContainer to="/">
        <StyledLogo src={logoURL} />
      </StyledLogoContainer>
      <StyledUser>
        <User username={username} client={client} onlyAvatar={isMobile} />
      </StyledUser>
    </StyledHeader>
  );
}

export { Header };
export type { HeaderProps };
