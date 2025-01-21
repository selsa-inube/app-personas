import { DecisionModal } from "@components/modals/general/DecisionModal";
import { getHeader } from "@config/header";
import { getActions, getMobileNav, getNav } from "@config/nav";
import { Header } from "@design/navigation/Header";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { Button } from "@inubekit/button";
import { Grid, Icon, Stack } from "@inubekit/inubekit";
import { Nav } from "@inubekit/nav";
import { Text } from "@inubekit/text";
import { useContext, useState } from "react";
import { MdOutlineSentimentNeutral } from "react-icons/md";
import { AppContext } from "src/context/app";
import { capitalizeEachWord } from "src/utils/texts";
import { StyledMain, StyledPage } from "./styles";

const year = new Date().getFullYear();

function PageNotFound() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user } = useContext(AppContext);
  const { getFlag } = useContext(AppContext);
  const { logout } = useAuth();

  const isTablet = useMediaQuery("(min-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 550px)");

  const withSavingRequest = getFlag(
    "admin.savings.savings.request-saving",
  ).value;
  const withCreditRequest = getFlag(
    "admin.credits.credits.request-credit",
  ).value;
  const withEventRequest = getFlag("request.events.events.request-event").value;
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
  const withCertificationsRequests = getFlag(
    "request.certifications.certifications.request-certifications",
  ).value;

  const mobileNav = getMobileNav(
    withSavingRequest,
    withCreditRequest,
    withEventRequest,
    withAidRequest,
    withHolidaysRequest,
    withTransfers,
    withPayments,
    withMyRequests,
    withMyPQRS,
    withCertificationsRequests,
  );

  const nav = getNav(
    withSavingRequest,
    withCreditRequest,
    withEventRequest,
    withAidRequest,
    withHolidaysRequest,
    withTransfers,
    withPayments,
    withMyRequests,
    withMyPQRS,
    withCertificationsRequests,
  );

  const header = getHeader(
    getFlag("general.links.update-data.update-data-with-assisted").value,
    getFlag("general.links.update-data.update-data-without-assisted").value,
    getFlag("general.links.pqrs.create-pqrs").value,
    mobileNav,
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
