import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { RequestsContext } from "src/context/requests";
import { getEntriesForUser } from "src/services/iclient/events/getEntries";
import { equalArraysByProperty } from "src/utils/arrays";
import { MyEntriesUI } from "./interface";

const limitEntries = 5;
const refreshSeconds = 30;

let refreshInterval: ReturnType<typeof setTimeout> | null = null;
let countdownInterval: ReturnType<typeof setInterval> | null = null;

function MyEntries() {
  const [loading, setLoading] = useState(false);
  const { entries, setEntries } = useContext(RequestsContext);
  const [noMoreEntries, setNoMoreEntries] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [refreshTime, setRefreshTime] = useState(refreshSeconds);

  const navigate = useNavigate();

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

    const limit = entries.length > 0 ? entries.length : limitEntries;

    handleGetEntries(1, limit, true);

    startCountdown();

    refreshInterval = setInterval(() => {
      handleGetEntries(1, limit, true);
      startCountdown();
    }, 60000);
  };

  const handleGetEntries = (page: number, limit: number, reset?: boolean) => {
    if (!accessToken || !user.identification) return;
    setLoading(true);
    getEntriesForUser(user.identification, accessToken, page, limit)
      .then((newEntries) => {
        if (newEntries.length === 0) {
          setNoMoreEntries(true);
          return;
        }

        if (newEntries.length < limitEntries) {
          setNoMoreEntries(true);
        }

        if (reset) {
          const isEqualEntries = equalArraysByProperty(
            entries,
            newEntries,
            "id",
          );

          if (!isEqualEntries) {
            setEntries(newEntries.slice(0, limitEntries));
            return;
          }

          setEntries(newEntries);
          return;
        }

        setEntries([...entries, ...newEntries]);
      })
      .catch(() => {
        setNoMoreEntries(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddEntries = () => {
    const page = entries.length / limitEntries + 1;
    handleGetEntries(page, limitEntries);
  };

  const goToDetail = (id: string) => {
    navigate(`/my-entries/${id}`);
  };

  return (
    <MyEntriesUI
      entries={entries}
      loading={loading}
      noMoreEntries={noMoreEntries}
      refreshTime={refreshTime}
      onAddEntries={handleAddEntries}
      onRefresh={handleRefreshHistory}
      onGoToDetail={goToDetail}
    />
  );
}

export { MyEntries };
