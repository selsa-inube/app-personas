import { DecisionModal } from "@components/modals/general/DecisionModal";
import { getHeader } from "@config/header";
import { getActions, getMobileNav, useNav } from "@config/nav";
import { Header } from "@design/navigation/Header";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { Button, Grid, Icon, Nav, Stack, Text } from "@inubekit/inubekit";
import { useContext, useState } from "react";
import { MdOutlineSentimentNeutral } from "react-icons/md";
import { AppContext } from "src/context/app";
import { capitalizeEachWord } from "src/utils/texts";
import { useTheme } from "styled-components";
import { StyledMain, StyledPage } from "./styles";

const year = new Date().getFullYear();

function PageNotFound() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user } = useContext(AppContext);
  const { getFlag } = useContext(AppContext);
  const { logout } = useAuth();
  const theme = useTheme();

  const isTablet = useMediaQuery("(min-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 550px)");

  const withMyCards = getFlag("admin.cards.cards.my-cards").value;
  const withSavingRequest = getFlag(
    "admin.savings.savings.request-saving",
  ).value;
  const withCreditRequest = getFlag(
    "admin.credits.credits.request-credit",
  ).value;
  const withEventRequest = getFlag("request.events.events.request-event").value;
  const withTicketRequest = getFlag(
    "request.events.tickets.request-ticket",
  ).value;
  const withAidRequest = getFlag("request.aids.aids.request-aid").value;
  const withHolidaysRequest = getFlag(
    "request.holidays.holidays.request-holidays",
  ).value;
  const withTransfers = getFlag(
    "admin.transfers.deposit.deposit-accounts",
  ).value;
  const withPayments = getFlag("admin.payments.pay.payment-options").value;
  const withMyRequests = getFlag("admin.requests.requests.my-requests").value;
  const withMyPQRS = getFlag("admin.pqrs.pqrs.pqrs-option").value;
  const withMyEntries = getFlag("admin.entries.entries.my-entries").value;
  const withCertificationsRequests = getFlag(
    "request.certifications.certifications.request-certifications",
  ).value;

  const mobileNav = getMobileNav(
    withMyCards,
    withSavingRequest,
    withCreditRequest,
    withEventRequest,
    withTicketRequest,
    withAidRequest,
    withHolidaysRequest,
    withTransfers,
    withPayments,
    withMyRequests,
    withMyPQRS,
    withMyEntries,
    withCertificationsRequests,
  );

  const nav = useNav(
    withMyCards,
    withSavingRequest,
    withCreditRequest,
    withEventRequest,
    withTicketRequest,
    withAidRequest,
    withHolidaysRequest,
    withTransfers,
    withPayments,
    withMyRequests,
    withMyPQRS,
    withMyEntries,
    withCertificationsRequests,
  );

  const header = getHeader(
    getFlag("general.links.update-data.update-data-with-assisted").value,
    getFlag("general.links.pqrs.create-pqrs").value,
    mobileNav,
    theme.images.logo,
  );

  const username = capitalizeEachWord(
    `${user.firstName} ${user.firstLastName}`,
  );

  const fullName = capitalizeEachWord(
    `${user.firstName} ${user.secondName || ""} ${user.firstLastName} ${
      user.secondLastName || ""
    }`,
  );

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
  };

  const handleToggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  const actions = getActions(handleToggleLogoutModal);

  return (
    <StyledPage>
      <Header
        logoURL={header.logoURL}
        username={username}
        fullName={fullName}
        businessUnit={header.businessUnit}
        links={header.links}
        portalId={header.portalId}
        logoutTitle={header.logoutTitle}
        navigation={header.navigation}
      />
      <Grid
        templateColumns={isTablet ? "auto 1fr" : "1fr"}
        height="calc(100vh - 53px)"
      >
        {isTablet && (
          <Nav
            navigation={nav}
            actions={actions}
            footerLabel={`©${year} - Inube`}
            collapse
          />
        )}
        <StyledMain>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={isMobile ? inube.spacing.s300 : inube.spacing.s400}
          >
            <Icon
              appearance="gray"
              icon={<MdOutlineSentimentNeutral />}
              size={isMobile ? "40px" : "60px"}
              spacing="narrow"
            />
            <Stack
              direction="column"
              gap={inube.spacing.s200}
              alignItems="center"
              width={isMobile ? "312px" : "500px"}
            >
              <Text
                type="title"
                size={isMobile ? "small" : "large"}
                textAlign="center"
              >
                Recurso no disponible
              </Text>
              <Text
                type={isMobile ? "body" : "title"}
                size={isMobile ? "small" : "medium"}
                appearance="gray"
                textAlign="center"
              >
                La pagina que estás buscando no se encuentra disponible.
              </Text>
            </Stack>
            <Button
              variant="none"
              type="link"
              path="/"
              spacing={isMobile ? "compact" : "wide"}
            >
              Volver al inicio
            </Button>
          </Stack>
        </StyledMain>
      </Grid>
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
    </StyledPage>
  );
}

export { PageNotFound };
