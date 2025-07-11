import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { PaymentHistoryModal } from "@components/modals/payments/PaymentHistoryModal";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useQuickLinks } from "@hooks/useQuickLinks";
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { IPaymentHistory } from "src/model/entity/payment";
import { EMovementType } from "src/model/entity/product";
import { EmptyRecords } from "./EmptyRecords";
import { generateAttributes } from "./config/attributeRecord";
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
    onTogglePaymentHistoryModal,
    onAddPayments,
    onToggleClosePaymentHistoryModal,
  } = props;
  const quickLinksArray = useQuickLinks();

  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <>
      <Stack
        direction="column"
        gap={
          isMobile
            ? inube.spacing.s300
            : isTablet
              ? inube.spacing.s500
              : inube.spacing.s600
        }
      >
        <Stack direction="column" gap={inube.spacing.s300}>
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
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack direction="column" gap={inube.spacing.s300}>
          <Stack direction="column" gap={inube.spacing.s100}>
            <Text type="title" size="small" weight="bold">
              Movimientos en proceso
            </Text>

            <Text type="body" size="medium" appearance="gray">
              Una vez procesado el pago, los movimientos dentro de los productos
              relacionados pueden tardar unos minutos en aparecer.
            </Text>
          </Stack>

          {paymentHistory.length > 0 ? (
            <>
              <StyledContainer>
                {paymentHistory.map((payment, index) => (
                  <Stack
                    direction="column"
                    width="100%"
                    key={payment.id}
                    gap={inube.spacing.s200}
                  >
                    <RecordCard
                      id={payment.id}
                      type={EMovementType.RECORD}
                      description={payment.title}
                      value={payment.value}
                      tag={payment.tag.label !== "" ? payment.tag : undefined}
                      attributes={generateAttributes(payment)}
                      onClick={() => onTogglePaymentHistoryModal(payment)}
                      withExpandingIcon
                      datesWithTime
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
                  loading={loading}
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
        {isDesktop && <QuickAccess links={quickLinksArray} />}
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
