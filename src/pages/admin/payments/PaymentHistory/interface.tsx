import { QuickAccess } from "@components/cards/QuickAccess";
import { PaymentHistoryCard } from "@components/cards/payments/PaymentHistoryCard";
import { PaymentHistoryModal } from "@components/modals/payments/PaymentHistoryModal";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdAdd, MdArrowBack, MdHistory } from "react-icons/md";
import { IPaymentHistory } from "src/model/entity/payment";
import { EmptyRecords } from "./EmptyRecords";
import { crumbsPaymentHistory } from "./config/navigation";
import { StyledContainer } from "./styles";

interface PaymentHistoryUIProps {
  showPaymentHistoryModal: boolean;
  paymentHistory: IPaymentHistory[];
  loading: boolean;
  selectedPayment?: IPaymentHistory;
  noMorePayments: boolean;
  refreshTime: number;
  onTogglePaymentHistoryModal: (payment: IPaymentHistory) => void;
  onAddPayments: () => void;
  onToggleClosePaymentHistoryModal: () => void;
  onRefreshHistory: () => void;
}

function PaymentHistoryUI(props: PaymentHistoryUIProps) {
  const {
    showPaymentHistoryModal,
    paymentHistory,
    loading,
    selectedPayment,
    noMorePayments,
    refreshTime,
    onTogglePaymentHistoryModal,
    onAddPayments,
    onToggleClosePaymentHistoryModal,
    onRefreshHistory,
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
              onClick={onRefreshHistory}
              load={loading}
              disabled={!loading && refreshTime !== 0}
            >
              {refreshTime !== 0 ? `${refreshTime} Seg.` : "Refrescar"}
            </Button>
          </Stack>

          {!loading && paymentHistory.length > 0 ? (
            <>
              <StyledContainer>
                {paymentHistory.map((payment, index) => (
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
                      paymentMethod={payment.paymentMethod}
                      cus={payment.cus}
                      onClick={() => onTogglePaymentHistoryModal(payment)}
                    />
                    {index !== paymentHistory.length - 1 && <Divider dashed />}
                  </Stack>
                ))}
              </StyledContainer>
              <Stack direction="column" alignItems="center">
                <Button
                  appearance="primary"
                  variant="none"
                  iconBefore={<MdAdd />}
                  load={loading}
                  onClick={onAddPayments}
                  disabled={noMorePayments}
                >
                  Ver más pagos
                </Button>
              </Stack>
            </>
          ) : (
            !loading && <EmptyRecords />
          )}
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
      {showPaymentHistoryModal && selectedPayment && (
        <PaymentHistoryModal
          paymentHistoryData={selectedPayment}
          onCloseModal={onToggleClosePaymentHistoryModal}
        />
      )}
    </>
  );
}

export { PaymentHistoryUI };
