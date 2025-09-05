import { useAuth } from "@inube/auth";
import { captureNewError } from "@utils/handleErrors";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { ITransfer } from "src/model/entity/transfer";
import { getTransferHistory } from "src/services/iclient/transfers/getTransferHistory";
import { equalArraysByProperty } from "src/utils/arrays";
import { TransferHistoryUI } from "./interface";

const limitTransfers = 5;
const refreshSeconds = 60;

let refreshInterval: ReturnType<typeof setTimeout> | null = null;
let countdownInterval: ReturnType<typeof setInterval> | null = null;

function TransferHistory() {
  const [loading, setLoading] = useState(false);
  const [transferHistory, setTransferHistory] = useState<ITransfer[]>([]);
  const [noMoreTransfers, setNoMoreTransfers] = useState(false);
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
      transferHistory.length > 0 ? transferHistory.length : limitTransfers;

    handleGetTransferHistory(1, limit, true);

    startCountdown();

    refreshInterval = setInterval(() => {
      handleGetTransferHistory(1, limit, true);
      startCountdown();
    }, 60000);
  };

  const handleGetTransferHistory = (
    page: number,
    limit: number,
    reset?: boolean,
  ) => {
    if (!accessToken || !user.identification) return;
    setLoading(true);
    getTransferHistory(user.identification, accessToken, page, limit)
      .then((newTransferHistory) => {
        if (newTransferHistory.length === 0) {
          setNoMoreTransfers(true);
          return;
        }

        if (newTransferHistory.length < limitTransfers) {
          setNoMoreTransfers(true);
        }

        if (reset) {
          const isEqualTransfers = equalArraysByProperty(
            transferHistory,
            newTransferHistory,
            "id",
          );

          if (!isEqualTransfers) {
            setTransferHistory(newTransferHistory.slice(0, limitTransfers));
            return;
          }

          setTransferHistory(newTransferHistory);
          return;
        }

        setTransferHistory([...transferHistory, ...newTransferHistory]);
      })
      .catch((error) => {
        setNoMoreTransfers(true);

        captureNewError(
          error,
          {
            inFunction: "handleGetTransferHistory",
            action: "getTransferHistory",
            screen: "TransferHistory",
            file: "src/pages/admin/transfers/TransferHistory/index.tsx",
          },
          { feature: "transfer" },
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddTransfers = () => {
    const page = transferHistory.length / limitTransfers + 1;
    handleGetTransferHistory(page, limitTransfers);
  };

  return (
    <TransferHistoryUI
      transferHistory={transferHistory}
      loading={loading}
      noMoreTransfers={noMoreTransfers}
      refreshTime={refreshTime}
      onAddTransfers={handleAddTransfers}
      onRefreshHistory={handleRefreshHistory}
    />
  );
}

export { TransferHistory };
