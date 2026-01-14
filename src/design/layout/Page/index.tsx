import { DecisionModal } from "@components/modals/general/DecisionModal";
import { enviroment } from "@config/enviroment";
import { getHeader, getMenuSections } from "@config/header";
import { getActions, getMobileNav, useNav } from "@config/nav";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { Grid, Header, Nav } from "@inubekit/inubekit";
import { useContext, useLayoutEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { AppContext } from "src/context/app";
import { capitalizeEachWord } from "src/utils/texts";
import { StyledMain, StyledNav, StyledPage } from "./styles";

interface PageProps {
  withNav?: boolean;
}

function Page(props: PageProps) {
  const { withNav = true } = props;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user } = useContext(AppContext);
  const { getFlag } = useContext(AppContext);
  const { logout } = useAuth();

  const isTablet = useMediaQuery("(max-width: 1050px)");

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

  const header = getHeader(
    getFlag("general.links.update-data.update-data-with-assisted").value,
    getFlag("general.links.pqrs.create-pqrs").value,
    mobileNav,
    `https://storage.googleapis.com/assets-clients/inube/${enviroment.BUSINESS_UNIT}/${enviroment.BUSINESS_UNIT}-logo.png`,
  );

  const isConsultingUser = !!sessionStorage.getItem("consultingUser");

  const username = capitalizeEachWord(`${user.firstName} ${user.lastName}`);

  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
  };

  const actions = getActions(handleToggleLogoutModal);

  return (
    <StyledPage $isTablet={isTablet} $withNav={withNav}>
      {!isTablet && withNav && (
        <StyledNav>
          <Nav
            navigation={nav}
            actions={actions}
            footerLogo={header.logoURL}
            spacing="compact"
            collapse
          />
        </StyledNav>
      )}
      <Grid
        templateColumns={"auto"}
        templateRows={"auto 1fr"}
        width="100%"
        justifyContent="normal"
      >
        <Header
          user={{
            username,
            client: header.businessUnit,
          }}
          links={{ items: header.links, breakpoint: "900px" }}
          navigation={{ nav: header.navigation, breakpoint: "1050px" }}
          menu={getMenuSections(isConsultingUser, handleToggleLogoutModal)}
        />
        <StyledMain id="main" $isTablet={isTablet} $withNav={withNav}>
          <Outlet />
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

export { Page };
