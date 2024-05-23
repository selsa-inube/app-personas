import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { IPaymentHistory } from "src/model/entity/payment";
import { getPaymentHistory } from "src/services/iclient/payments/getPaymentHistory";
import { equalArraysByProperty } from "src/utils/arrays";
import { PaymentHistoryUI } from "./interface";

const limitPayments = 5;

let refreshInterval: ReturnType<typeof setTimeout> | null = null;

function PaymentHistory() {
  const [showPaymentHistoryModal, setShowPaymentHistoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<IPaymentHistory[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<
    IPaymentHistory | undefined
  >();
  const [noMorePayments, setNoMorePayments] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  useEffect(() => {
    handleRefreshHistory();

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, []);

  const handleRefreshHistory = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }

    const limit =
      paymentHistory.length > 0 ? paymentHistory.length : limitPayments;

    handleGetPaymentHistory(1, limit, true);

    refreshInterval = setInterval(() => {
      handleGetPaymentHistory(1, limit, true);
    }, 60000);
  };

  const handleGetPaymentHistory = (
    page: number,
    limit: number,
    reset?: boolean,
  ) => {
    if (accessToken) {
      setLoading(true);
      getPaymentHistory(user.identification, accessToken, page, limit)
        .then((newPaymentHistory) => {
          if (newPaymentHistory.length === 0) {
            setNoMorePayments(true);
            return;
          }

          if (newPaymentHistory.length < limitPayments) {
            setNoMorePayments(true);
          }

          if (reset) {
            const isEqualPayments = equalArraysByProperty(
              paymentHistory,
              newPaymentHistory,
              "id",
            );

            if (!isEqualPayments) {
              setPaymentHistory(newPaymentHistory.slice(0, limitPayments));
              return;
            }

            setPaymentHistory(newPaymentHistory);
            return;
          }

          setPaymentHistory([...paymentHistory, ...newPaymentHistory]);
        })
        .catch((error) => {
          setNoMorePayments(true);
          console.info(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleAddPayments = () => {
    const page = paymentHistory.length / limitPayments + 1;
    handleGetPaymentHistory(page, limitPayments);
  };

  const handleTogglePaymentHistoryModal = (payment: IPaymentHistory) => {
    setShowPaymentHistoryModal(true);
    setSelectedPayment(payment);
  };

  const handleToggleClosePaymentHistoryModal = () => {
    setShowPaymentHistoryModal(false);
  };

  return (
    <PaymentHistoryUI
      showPaymentHistoryModal={showPaymentHistoryModal}
      paymentHistory={paymentHistory}
      loading={loading}
      selectedPayment={selectedPayment}
      noMorePayments={noMorePayments}
      onTogglePaymentHistoryModal={handleTogglePaymentHistoryModal}
      onAddPayments={handleAddPayments}
      onToggleClosePaymentHistoryModal={handleToggleClosePaymentHistoryModal}
      onRefreshHistory={handleRefreshHistory}
    />
  );
}

export { PaymentHistory };
