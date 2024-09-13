import { QuickAccess } from "@components/cards/QuickAccess";
import { RequestCard } from "@components/cards/RequestCard";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { RechargeModal } from "@components/modals/transfers/RechargeModal";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { crumbsTransferOptions } from "./config/navigation";
import { sendTransferRequest } from "./utils";
import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { Text } from "@inubekit/text";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { useFlag } from "@inubekit/flag";

function TransferOptions() {
  const isDesktop = useMediaQuery("(min-width: 1400px)");

  const { savings, setSavings } = useContext(SavingsContext);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const { addFlag } = useFlag();

  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;
    if (savings.savingsAccounts.length === 0) {
      getSavingsForUser(user.identification, accessToken)
        .then((savings) => {
          setSavings(savings);
        })
        .catch((error) => {
          console.info(error.message);
        });
    }
  }, [user, accessToken]);

  const handleGoHistory = () => {
    navigate("/transfers/history");
  };

  const handleSubmitRecharge = (savingAccount: string, amount: number) => {
    if (!accessToken) return;

    setShowRechargeModal(false);
    setLoadingSend(true);

    sendTransferRequest(user, savingAccount, amount, accessToken).catch(() => {
      addFlag({
        title: "El depósito no pudo ser procesado",
        description:
          "Ya fuimos notificados y estamos revisando. Intenta de nuevo más tarde.",
        appearance: "danger",
        duration: 5000,
      });

      setLoadingSend(false);
    });
  };

  const handleToggleRechargeModal = () => {
    setShowRechargeModal(!showRechargeModal);
  };

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsTransferOptions} />
        <Title
          title="Transferencias"
          subtitle="Gestiona tus transferencias de dinero."
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      <Grid
        gap={inube.spacing.s600}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap={inube.spacing.s400}>
          <Text type="title" size="small">
            Aquí encontraras las opciones que puedes usar para gestionar tus
            transferencias.
          </Text>

          <Stack direction="column" gap={inube.spacing.s300}>
            <RequestCard
              title="Deposita en tu cuenta de ahorros"
              descriptions={[
                "Realiza transferencias de dinero para depositar en tu cuenta de ahorros.",
              ]}
              actionText="Depositar"
              onClick={handleToggleRechargeModal}
            />
            <RequestCard
              title="Histórico de transferencias"
              descriptions={[
                "Revisa el historial de transferencias que has realizado de forma reciente.",
              ]}
              actionText="Consultar"
              onClick={handleGoHistory}
            />
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>

      {showRechargeModal && (
        <RechargeModal
          onCloseModal={handleToggleRechargeModal}
          savingAccounts={savings.savingsAccounts}
          onSubmit={handleSubmitRecharge}
        />
      )}

      {loadingSend && (
        <LoadingModal
          title="Procesando depósito..."
          message="Espera unos segundos, estamos procesando la transacción."
        />
      )}
    </>
  );
}

export { TransferOptions };
