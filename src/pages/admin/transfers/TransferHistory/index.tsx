import { useAuth } from "@inube/auth";
import { transferHistoryMock } from "@mocks/transfers/transferHistory.mocks";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { ITransfer } from "src/model/entity/transfer";
import { getTransferHistory } from "src/services/iclient/transfers/getTransferHistory";
import { equalArraysByProperty } from "src/utils/arrays";
import { TransferHistoryUI } from "./interface";

const limitTransfers = 5;

let refreshInterval: ReturnType<typeof setTimeout> | null = null;

function TransferHistory() {
  const [loading, setLoading] = useState(false);
  const [transferHistory, setTransferHistory] = useState<ITransfer[]>([]);
  const [noMoreTransfers, setNoMoreTransfers] = useState(false);
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
      transferHistory.length > 0 ? transferHistory.length : limitTransfers;

    handleGetTransferHistory(1, limit, true);

    refreshInterval = setInterval(() => {
      handleGetTransferHistory(1, limit, true);
    }, 60000);
  };

  const handleGetTransferHistory = (
    page: number,
    limit: number,
    reset?: boolean,
  ) => {
    if (accessToken) {
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
          /* setNoMoreTransfers(true); */ // TEMP
          setTransferHistory(transferHistoryMock);
          console.info(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
      onAddTransfers={handleAddTransfers}
      onRefreshHistory={handleRefreshHistory}
    />
  );
}

export { TransferHistory };
