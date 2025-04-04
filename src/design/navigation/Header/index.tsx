import { useMediaQuery } from "@hooks/useMediaQuery";
import { User } from "../../data/User";
import { IHeaderLink } from "./types";

import { FullscreenNav } from "@design/navigation/FullscreenNav";

import { DecisionModal } from "@components/modals/general/DecisionModal";
import { getMenuSections } from "@config/header";
import { INav } from "@design/layout/Page/types";
import { inube } from "@design/tokens";
import { useAuth } from "@inube/auth";
import { Stack, Text } from "@inubekit/inubekit";
import { useEffect, useRef, useState } from "react";
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
  businessUnit?: string;
  fullName: string;
  links?: IHeaderLink[];
  portalId: string;
  logoutTitle: string;
  navigation: INav;
}

function Header(props: HeaderProps) {
  const {
    logoURL,
    username,
    businessUnit,
    fullName,
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

  const handleToggleUserMenu = () => {
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

  const isConsultingUser = !!sessionStorage.getItem("consultingUser");

  return (
    <>
      <StyledHeader>
        {!isTablet ? (
          <Stack
            gap={inube.spacing.s200}
            justifyContent="center"
            alignItems="center"
          >
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
            businessUnit={businessUnit}
            onlyAvatar={isMobile}
            onClick={handleToggleUserMenu}
          />
        </StyledUser>
      </StyledHeader>

      {showUserMenu && (
        <StyledContainerMenu ref={userMenuRef}>
          <Menu
            userName={fullName}
            businessUnit={businessUnit}
            sections={getMenuSections(
              isConsultingUser,
              handleToggleLogoutModal,
              handleToggleUserMenu,
            )}
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
