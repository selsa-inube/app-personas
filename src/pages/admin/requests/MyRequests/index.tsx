import { useAuth } from "@inube/auth";
import { captureNewError } from "@utils/handleErrors";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { RequestsContext } from "src/context/requests";
import { getRequestsForUser } from "src/services/iclient/requests/getRequests";
import { equalArraysByProperty } from "src/utils/arrays";
import { MyRequestsUI } from "./interface";

const limitRequests = 5;
const refreshSeconds = 60;

let refreshInterval: ReturnType<typeof setTimeout> | null = null;
let countdownInterval: ReturnType<typeof setInterval> | null = null;

function MyRequests() {
  const [loading, setLoading] = useState(false);
  const { requests, setRequests } = useContext(RequestsContext);
  const [noMoreRequests, setNoMoreRequests] = useState(false);
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

    const limit = requests.length > 0 ? requests.length : limitRequests;

    handleGetRequests(1, limit, true);

    startCountdown();

    refreshInterval = setInterval(() => {
      handleGetRequests(1, limit, true);
      startCountdown();
    }, 60000);
  };

  const handleGetRequests = (page: number, limit: number, reset?: boolean) => {
    if (!accessToken || !user.identification) return;
    setLoading(true);
    getRequestsForUser(user.identification, accessToken, page, limit, user)
      .then((newRequests) => {
        if (newRequests.length === 0) {
          setNoMoreRequests(true);
          return;
        }

        if (newRequests.length < limitRequests) {
          setNoMoreRequests(true);
        }

        if (reset) {
          const isEqualRequests = equalArraysByProperty(
            requests,
            newRequests,
            "id",
          );

          if (!isEqualRequests) {
            setRequests(newRequests.slice(0, limitRequests));
            return;
          }

          setRequests(newRequests);
          return;
        }

        setRequests([...requests, ...newRequests]);
      })
      .catch((error) => {
        setNoMoreRequests(true);

        captureNewError(
          error,
          {
            inFunction: "handleGetRequests",
            action: "getRequestsForUser",
            screen: "MyRequests",
            file: "src/pages/admin/requests/MyRequests/index.tsx",
          },
          { feature: "requests" },
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddRequests = () => {
    const page = requests.length / limitRequests + 1;
    handleGetRequests(page, limitRequests);
  };

  const goToDetail = (id: string) => {
    navigate(`/my-requests/${id}`);
  };

  return (
    <MyRequestsUI
      requests={requests}
      loading={loading}
      noMoreRequests={noMoreRequests}
      refreshTime={refreshTime}
      onAddRequests={handleAddRequests}
      onRefresh={handleRefreshHistory}
      onGoToDetail={goToDetail}
    />
  );
}

export { MyRequests };
