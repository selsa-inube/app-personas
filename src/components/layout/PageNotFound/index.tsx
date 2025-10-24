import { DecisionModal } from "@components/modals/general/DecisionModal";
import { enviroment } from "@config/enviroment";
import { getHeader, getMenuSections } from "@config/header";
import { getActions, getMobileNav, useNav } from "@config/nav";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { Button, Header, Icon, Nav, Stack, Text } from "@inubekit/inubekit";
import { useContext, useState } from "react";
import { MdOutlineSentimentNeutral } from "react-icons/md";
import { AppContext } from "src/context/app";
import { capitalizeEachWord } from "src/utils/texts";
import { StyledMain, StyledNav, StyledPage } from "./styles";

function PageNotFound() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user } = useContext(AppContext);
  const { getFlag } = useContext(AppContext);
  const { logout } = useAuth();

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
  const withCreatePQRS = getFlag("general.links.pqrs.create-pqrs").value;
  const updateDataAssistedFlag = getFlag(
    "general.links.update-data.update-data-with-assisted",
  ).value;

  const handleToggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

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
    withCreatePQRS,
    updateDataAssistedFlag,
    handleToggleLogoutModal,
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
    `https://storage.googleapis.com/assets-clients/inube/${enviroment.BUSINESS_UNIT}/${enviroment.BUSINESS_UNIT}-logo.png`,
  );

  const username = capitalizeEachWord(`${user.firstName} ${user.lastName}`);

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
  };

  const actions = getActions(handleToggleLogoutModal);
  const isConsultingUser = !!sessionStorage.getItem("consultingUser");

  return (
    <StyledPage $isTablet={isTablet}>
      {isTablet && (
        <StyledNav>
          <Nav
            navigation={nav}
            actions={actions}
            footerLogo={header.logoURL}
            collapse
          />
        </StyledNav>
      )}
      <Stack direction="column">
        <Header
          user={{
            username,
            client: header.businessUnit,
          }}
          links={{ items: header.links, breakpoint: "900px" }}
          navigation={{ nav: header.navigation, breakpoint: "1050px" }}
          menu={getMenuSections(isConsultingUser, handleToggleLogoutModal)}
        />
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
      </Stack>
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
