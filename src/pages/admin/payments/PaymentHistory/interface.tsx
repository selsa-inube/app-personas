import { Title } from "@design/data/Title";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { crumbsPaymentHistory } from "./config/navigation";
import { MdAdd, MdArrowBack, MdHistory } from "react-icons/md";
import { Grid } from "@design/layout/Grid";
import { inube } from "@design/tokens";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { PaymentHistoryCard } from "@components/cards/PaymentHistoryCard";
import { Divider } from "@design/layout/Divider";
import { Button } from "@design/input/Button";
import { PaymentHistoryModal } from "@components/modals/payments/PaymentHistoryModal";
import { IPaymentHistory } from "src/model/entity/payment";
import { paymentHistoryMock } from "@mocks/payments/paymentHistory.mocks";
import { StyledContainer } from "./styles";

interface PaymentHistoryUIProps {
  showPaymentHistoryModal: boolean;
  payments: IPaymentHistory[];
  loading: boolean;
  selectedPayment: IPaymentHistory | undefined;
  handleTogglePaymentHistoryModal: (payment: IPaymentHistory) => void;
  handleAddPaymentCards: () => void;
  handleToggleClosePaymentHistoryModal: () => void;
}

function PaymentHistoryUI(props: PaymentHistoryUIProps) {
  const {
    showPaymentHistoryModal,
    payments,
    loading,
    selectedPayment,
    handleTogglePaymentHistoryModal,
    handleAddPaymentCards,
    handleToggleClosePaymentHistoryModal,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <>
      <Stack
        direction="column"
        gap={isMobile ? "s300" : isTablet ? "s500" : "s600"}
      >
        <Stack direction="column" gap="s300">
          <Breadcrumbs crumbs={crumbsPaymentHistory} />
          <Title
            title="Histórico de pagos"
            subtitle="Últimos pagos realizados"
            icon={<MdArrowBack />}
            navigatePage="/payments"
          />
        </Stack>
      </Stack>
      <Grid
        gap="s600"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          <Stack direction="column" alignItems="flex-end">
            <Button
              appearance="primary"
              variant="outlined"
              spacing="compact"
              iconBefore={<MdHistory />}
            >
              Refrescar
            </Button>
          </Stack>
          <StyledContainer>
            {payments.map((payment, index) => (
              <Stack
                direction="column"
                width="100%"
                key={payment.id}
                gap="s200"
              >
                <PaymentHistoryCard
                  id={payment.id}
                  title={payment.title}
                  value={payment.value}
                  tag={payment.tag}
                  paymentDate={payment.paymentDate}
                  paymentType={payment.paymentType}
                  cus={payment.cus}
                  onClick={() => handleTogglePaymentHistoryModal(payment)}
                />
                {index !== payments.length - 1 && <Divider dashed />}
              </Stack>
            ))}
          </StyledContainer>
          <Stack direction="column" alignItems="center">
            <Button
              appearance="primary"
              variant="none"
              iconBefore={<MdAdd />}
              load={loading}
              onClick={handleAddPaymentCards}
              disabled={paymentHistoryMock.length === payments.length}
            >
              Ver más movimientos
            </Button>
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
      {showPaymentHistoryModal && selectedPayment && (
        <PaymentHistoryModal
          paymentHistoryData={selectedPayment}
          onCloseModal={handleToggleClosePaymentHistoryModal}
        />
      )}
    </>
  );
}

export { PaymentHistoryUI };
