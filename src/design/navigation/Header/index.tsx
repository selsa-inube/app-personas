import { useMediaQuery } from "@hooks/useMediaQuery";
import { User } from "../../data/User";
import { IHeaderLink } from "./types";
import { Text } from "@design/data/Text";

import {
  StyledHeader,
  StyledLogo,
  StyledLogoContainer,
  StyledUser,
  StyledLink,
  StyledContainer,
} from "./styles";

interface HeaderProps {
  logoURL?: string;
  username: string;
  client?: string;
  links?: IHeaderLink[];
}

function Header(props: HeaderProps) {
  const { logoURL, username, client, links } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(min-width: 600px)");

  return (
    <StyledHeader>
      <StyledContainer>
        <StyledLogoContainer to="/">
          <StyledLogo src={logoURL} />
        </StyledLogoContainer>
      </StyledContainer>
      {isTablet &&
        links &&
        links.map((link, index) => (
          <StyledLink key={index} to={link.path}>
            <Text type="label" size="medium" appearance="gray">
              {link.label}
            </Text>
          </StyledLink>
        ))}
      <StyledUser>
        <User username={username} client={client} onlyAvatar={isMobile} />
      </StyledUser>
    </StyledHeader>
  );
}

export { Header };
export type { HeaderProps };
