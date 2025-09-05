import { useAuth } from "@inube/auth";
import * as Sentry from "@sentry/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { IPaymentHistory } from "src/model/entity/payment";
import { getPaymentHistory } from "src/services/iclient/payments/getPaymentHistory";
import { equalArraysByProperty } from "src/utils/arrays";
import { PaymentHistoryUI } from "./interface";

const limitPayments = 5;
const refreshSeconds = 60;

let refreshInterval: ReturnType<typeof setTimeout> | null = null;
let countdownInterval: ReturnType<typeof setInterval> | null = null;

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
  const [refreshTime, setRefreshTime] = useState(refreshSeconds);

  useEffect(() => {
    handleRefreshHistory();

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [user, accessToken]);

  const startCountdown = () => {
    setRefreshTime(refreshSeconds);

    countdownInterval = setInterval(() => {
      setRefreshTime((prevTime) => {
        if (prevTime <= 1 && countdownInterval) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleRefreshHistory = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    const limit =
      paymentHistory.length > 0 ? paymentHistory.length : limitPayments;

    handleGetPaymentHistory(1, limit, true);

    startCountdown();

    refreshInterval = setInterval(() => {
      handleGetPaymentHistory(1, limit, true);
      startCountdown();
    }, 60000);
  };

  const handleGetPaymentHistory = (
    page: number,
    limit: number,
    reset?: boolean,
  ) => {
    if (!accessToken || !user.identification) return;

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

        Sentry.captureException(error, {
          extra: {
            inFunction: "handleGetPaymentHistory",
            action: "getPaymentHistory",
            screen: "PaymentHistory",
            file: "src/pages/admin/payments/PaymentHistory/index.tsx",
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
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
      refreshTime={refreshTime}
      onTogglePaymentHistoryModal={handleTogglePaymentHistoryModal}
      onAddPayments={handleAddPayments}
      onToggleClosePaymentHistoryModal={handleToggleClosePaymentHistoryModal}
      onRefreshHistory={handleRefreshHistory}
    />
  );
}

export { PaymentHistory };
