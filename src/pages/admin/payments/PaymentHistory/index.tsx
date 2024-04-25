import { useState, useEffect } from "react";
import { PaymentHistoryUI } from "./interface";
import { paymentHistoryMock } from "@mocks/payments/paymentHistory.mocks";
import { IPaymentHistory } from "src/model/entity/payment";

function PaymentHistory() {
  const [showPaymentHistoryModal, setShowPaymentHistoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentHistoryCards, setPaymentHistoryCards] = useState<IPaymentHistory[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<IPaymentHistory | undefined>();
  const [maxPaymentHistoryCards, setMaxPaymentHistoryCards] = useState(0);

  useEffect(() => {
    setPaymentHistoryCards(paymentHistoryMock.slice(0, 5));
    setMaxPaymentHistoryCards(paymentHistoryMock.length);
  }, []);

  const handleAddPaymentCards = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        const newPaymentCards = paymentHistoryCards.concat(
          paymentHistoryMock.slice(
            paymentHistoryCards.length,
            paymentHistoryCards.length + 5,
          ),
        );
        setPaymentHistoryCards(newPaymentCards.slice(0, maxPaymentHistoryCards));
      } finally {
        setLoading(false);
      }
    }, 500);
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
      payments={paymentHistoryCards}
      loading={loading}
      selectedPayment={selectedPayment}
      handleTogglePaymentHistoryModal={handleTogglePaymentHistoryModal}
      handleAddPaymentCards={handleAddPaymentCards}
      handleToggleClosePaymentHistoryModal={handleToggleClosePaymentHistoryModal}
    />
  );
}

export { PaymentHistory };
