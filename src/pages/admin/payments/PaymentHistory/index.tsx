import { useAuth } from "@inube/auth";
import { useEffect, useState } from "react";
import { IPaymentHistory } from "src/model/entity/payment";
import { getPaymentHistory } from "src/services/iclient/payments/getPaymentHistory";
import { PaymentHistoryUI } from "./interface";

function PaymentHistory() {
  const [showPaymentHistoryModal, setShowPaymentHistoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<IPaymentHistory[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<
    IPaymentHistory | undefined
  >();
  const { user, accessToken } = useAuth();

  useEffect(() => {
    handleRefreshHistory();
  }, [user, accessToken]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      handleRefreshHistory();
    }, 60000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const handleRefreshHistory = () => {
    handleGetPaymentHistory(0, 5);
  };

  const handleGetPaymentHistory = (page: number, limit: number) => {
    if (user && accessToken && paymentHistory.length === 0) {
      setLoading(true);
      getPaymentHistory(user.identification, accessToken, page, limit)
        .then((paymentHistory) => {
          setPaymentHistory(paymentHistory);
        })
        .catch((error) => {
          console.info(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleAddPaymentCards = () => {
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
      onTogglePaymentHistoryModal={handleTogglePaymentHistoryModal}
      onAddPaymentCards={handleAddPaymentCards}
      onToggleClosePaymentHistoryModal={handleToggleClosePaymentHistoryModal}
      onRefreshHistory={handleRefreshHistory}
    />
  );
}

export { PaymentHistory };
