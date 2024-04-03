import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { User } from "../../data/User";
import { IHeaderLink } from "./types";

import { FullscreenNav } from "@design/navigation/FullscreenNav";

import { DecisionModal } from "@components/modals/general/DecisionModal";
import { INav } from "@design/layout/Page/types";
import { useAuth } from "@inube/auth";
import { useEffect, useRef, useState } from "react";
import { MdLogout } from "react-icons/md";
import { Menu } from "../Menu";
import {
  StyledContainer,
  StyledContainerMenu,
  StyledHeader,
  StyledLink,
  StyledLogo,
  StyledLogoContainer,
  StyledUser,
} from "./styles";

interface HeaderProps {
  logoURL?: string;
  username: string;
  fullName: string;
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
    fullName,
    client,
    links,
    portalId,
    logoutTitle,
    navigation,
  } = props;

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(min-width: 900px)");

  const handleClickOutside = (event: MouseEvent) => {
    if (
      userMenuRef.current &&
      !userMenuRef.current.contains(event.target as Node) &&
      event.target !== userMenuRef.current
    ) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleuserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleToggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
  };

  return (
    <>
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
          <User
            username={username}
            client={client}
            onlyAvatar={isMobile}
            onClick={handleToggleuserMenu}
          />
        </StyledUser>
      </StyledHeader>

      {showUserMenu && (
        <StyledContainerMenu ref={userMenuRef}>
          <Menu
            userName={fullName}
            divider
            sections={[
              {
                links: [
                  {
                    title: "Cerrar sesión",
                    iconBefore: <MdLogout />,
                    onClick: handleToggleLogoutModal,
                  },
                ],
              },
            ]}
          />
        </StyledContainerMenu>
      )}

      {showLogoutModal && (
        <DecisionModal
          title="Cerrar sesión"
          description="¿Realmente quieres cerrar sesión?"
          actionText="Cerrar sesión"
          portalId="modals"
          onCloseModal={handleToggleLogoutModal}
          onClick={handleLogout}
        />
      )}
    </>
  );
}

export { Header };
export type { HeaderProps };
