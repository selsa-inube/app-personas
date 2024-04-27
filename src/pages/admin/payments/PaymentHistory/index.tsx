import { useAuth } from "@inube/auth";
import { useEffect, useState } from "react";
import { IPaymentHistory } from "src/model/entity/payment";
import { getPaymentHistory } from "src/services/iclient/payments/getPaymentHistory";
import { PaymentHistoryUI } from "./interface";

let refreshInterval: ReturnType<typeof setTimeout> | null = null;

function PaymentHistory() {
  const [showPaymentHistoryModal, setShowPaymentHistoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<IPaymentHistory[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<
    IPaymentHistory | undefined
  >();
  const [noMorePayments, setNoMorePayments] = useState(false);
  const { user, accessToken } = useAuth();

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

    handleGetPaymentHistory(0, 5);

    refreshInterval = setInterval(() => {
      handleGetPaymentHistory(0, 5);
    }, 5000);
  };

  const handleGetPaymentHistory = (page: number, limit: number) => {
    if (user && accessToken && paymentHistory.length === 0) {
      setLoading(true);
      getPaymentHistory(user.identification, accessToken, page, limit)
        .then((newPaymentHistory) => {
          if (newPaymentHistory.length === 0) {
            setNoMorePayments(true);
            return;
          }

          setPaymentHistory([...paymentHistory, ...newPaymentHistory]);
        })
        .catch((error) => {
          console.info(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleAddPayments = () => {
    handleGetPaymentHistory(paymentHistory.length, 5);
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
