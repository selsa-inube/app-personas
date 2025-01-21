import { QuickAccess } from "@components/cards/QuickAccess";
import { RequestCard } from "@components/cards/RequestCard";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Grid, Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { crumbsPaymentOptions } from "./config/navigation";

function PaymentOptions() {
  const isDesktop = useMediaQuery("(min-width: 1400px)");

  const navigate = useNavigate();

  const handleGoToPay = () => {
    navigate("/payments/pay");
  };

  const handleGoHistory = () => {
    navigate("/payments/history");
  };

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsPaymentOptions} />
        <Title
          title="Pagos"
          subtitle="Gestiona tus pagos y obligaciones."
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>

      <Grid
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack direction="column" gap={inube.spacing.s400}>
          <Text type="title" size="small">
            Aquí encontraras las opciones que puedes usar para gestionar tus
            pagos.
          </Text>

          <Stack direction="column" gap={inube.spacing.s300}>
            <RequestCard
              title="Realizar pagos"
              descriptions={[
                "Gestiona y realiza el pago de las obligaciones vigentes.",
              ]}
              actionText="Pagar"
              onClick={handleGoToPay}
            />
            <RequestCard
              title="Histórico de pagos"
              descriptions={[
                "Revisa el historial de pagos que has realizado de forma reciente.",
              ]}
              actionText="Consultar"
              onClick={handleGoHistory}
            />
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { PaymentOptions };
