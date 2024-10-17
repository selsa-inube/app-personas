import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/context/app";
import { useAuth } from "@inube/auth";
import { pqrsHistoryMock } from "@mocks/pqrs/pqrsHistory.mocks";
import { MyPQRSUI } from "./interface";
import { useNavigate } from "react-router-dom";

const refreshSeconds = 30;
let refreshInterval: ReturnType<typeof setTimeout> | null = null;
let countdownInterval: ReturnType<typeof setInterval> | null = null;

function MyPQRS() {
  const [refreshTime, setRefreshTime] = useState(refreshSeconds);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const { accessToken } = useAuth();

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
    setLoading(true);
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
    setLoading(false);
  };

  const handleRefreshHistory = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    startCountdown();

    refreshInterval = setInterval(() => {
      startCountdown();
    }, 300000);
  };

  const goToPQRS = (id: string) => {
    navigate(`/my-pqrs/details/${id}`);
  };

  return (
    <MyPQRSUI
      pqrsHistory={pqrsHistoryMock}
      loading={loading}
      refreshTime={refreshTime}
      onRefreshHistory={handleRefreshHistory}
      goToPQRS={goToPQRS}
    />
  );
}

export { MyPQRS };
