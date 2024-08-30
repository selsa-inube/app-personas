import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { RequestsContext } from "src/context/requests";
import { getRequestsForUser } from "src/services/iclient/requests/getRequests";
import { equalArraysByProperty } from "src/utils/arrays";
import { MyRequestsUI } from "./interface";

const limitRequests = 5;

let refreshInterval: ReturnType<typeof setTimeout> | null = null;

function MyRequests() {
  const [loading, setLoading] = useState(false);
  const { requests, setRequests } = useContext(RequestsContext);
  const [noMoreRequests, setNoMoreRequests] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

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

    const limit = requests.length > 0 ? requests.length : limitRequests;

    handleGetRequests(1, limit, true);

    refreshInterval = setInterval(() => {
      handleGetRequests(1, limit, true);
    }, 60000);
  };

  const handleGetRequests = (page: number, limit: number, reset?: boolean) => {
    if (accessToken) {
      setLoading(true);
      getRequestsForUser(user.identification, accessToken, page, limit)
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
          console.info(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleAddRequests = () => {
    const page = requests.length / limitRequests + 1;
    handleGetRequests(page, limitRequests);
  };

  const goToRequest = (id: string) => {
    navigate(`/my-requests/${id}`);
  };

  return (
    <MyRequestsUI
      requests={requests}
      loading={loading}
      noMoreRequests={noMoreRequests}
      onAddRequests={handleAddRequests}
      goToRequest={goToRequest}
    />
  );
}

export { MyRequests };
