import { useMediaQuery } from "@hooks/useMediaQuery";
import { User } from "../../data/User";
import { IHeaderLink } from "./types";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";

import { FullscreenNav } from "@design/navigation/FullscreenNav";

import {
  StyledHeader,
  StyledLogo,
  StyledLogoContainer,
  StyledUser,
  StyledLink,
  StyledContainer,
} from "./styles";
import { INav } from "@design/layout/Page/types";

interface HeaderProps {
  logoURL?: string;
  username: string;
  client?: string;
  links?: IHeaderLink[];
  portalId: string;
  logoutTitle: string;
  navigation: INav;
}

function Header(props: HeaderProps) {
  const {
    logoURL,
    username,
    client,
    links,
    portalId,
    logoutTitle,
    navigation,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(min-width: 900px)");

  return (
    <StyledHeader>
      {!isTablet ? (
        <Stack gap="s200" justifyContent="center" alignItems="center">
          <FullscreenNav
            portalId={portalId}
            logoutTitle={logoutTitle}
            navigation={navigation}
            links={links}
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
