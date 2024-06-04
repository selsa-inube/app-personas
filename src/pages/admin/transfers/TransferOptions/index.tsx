import { QuickAccess } from "@components/cards/QuickAccess";
import { RequestCard } from "@components/cards/RequestCard";
import { quickLinks } from "@config/quickLinks";
import { Text } from "@design/data/Text";
import { Title } from "@design/data/Title";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useContext, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SavingsContext } from "src/context/savings";
import { crumbsTransferOptions } from "./config/navigation";

function TransferOptions() {
  const isDesktop = useMediaQuery("(min-width: 1400px)");

  const { savings } = useContext(SavingsContext);

  const [rechargeModal, setRechargeModal] = useState({
    show: false,
    accounts: savings.savingsAccounts,
  });

  const navigate = useNavigate();

  const handleRecharge = () => {
    setRechargeModal({
      ...rechargeModal,
      show: true,
    });
  };

  const handleGoHistory = () => {
    navigate("/transfers/history");
  };

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsTransferOptions} />
        <Title
          title="Transferencias"
          subtitle="Gestiona tus transferencias de dinero."
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      <Grid
        gap="s600"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s400">
          <Text type="title" size="small">
            Aquí encontraras las opciones que puedes usar para gestionar tus
            transferencias.
          </Text>

          <Stack direction="column" gap="s300">
            <RequestCard
              title="Recarga tu cuenta de ahorros"
              descriptions={[
                "Realiza transferencias de dinero para recargar tu cuenta de ahorros.",
              ]}
              actionText="Recargar"
              onClick={handleRecharge}
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

      {rechargeModal.show && <></>}
    </>
  );
}

export { TransferOptions };
