import { useMediaQuery } from "@hooks/useMediaQuery";
import { User } from "../../data/User";
import { IHeaderLink } from "./types";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { INavigation } from "@design/fullscreenNav/types";

import { FullScreenNav } from "@design/fullscreenNav";

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
  portalId: string;
  logoutPath: string;
  logoutTitle: string;
  navigation: INavigation;
}

function Header(props: HeaderProps) {
  const {
    logoURL,
    username,
    client,
    links,
    portalId,
    logoutPath,
    logoutTitle,
    navigation,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(min-width: 900px)");

  return (
    <StyledHeader>
      {!isTablet ? (
        <Stack gap="s200" justifyContent="center" alignItems="center">
          <FullScreenNav
            portalId={portalId}
            logoutPath={logoutPath}
            logoutTitle={logoutTitle}
            navigation={navigation}
          />
          <StyledContainer>
            <StyledLogoContainer to="/">
              <StyledLogo src={logoURL} />
            </StyledLogoContainer>
          </StyledContainer>
        </Stack>
      ) : (
        <StyledContainer>
          <StyledLogoContainer to="/">
            <StyledLogo src={logoURL} />
          </StyledLogoContainer>
        </StyledContainer>
      )}
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
