import { useAuth } from "@inube/auth";
import { useEffect, useState } from "react";

const SESSION_EXPIRED_KEY = "sessionExpired";

function clearExpiredSession() {
  sessionStorage.clear();
  window.history.replaceState({}, "", "/");
}

function useSessionExpiration() {
  const { isSessionExpired, logout, isLoading, isAuthenticated } = useAuth();

  const [isForceLogout, setIsForceLogout] = useState(
    () => sessionStorage.getItem(SESSION_EXPIRED_KEY) === "true",
  );

  useEffect(() => {
    if (isSessionExpired) {
      sessionStorage.clear();
      sessionStorage.setItem(SESSION_EXPIRED_KEY, "true");
      setIsForceLogout(true);
    }
  }, [isSessionExpired]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && isForceLogout) {
      logout();
    }
  }, [isLoading, isAuthenticated, isForceLogout]);

  const isExpired = isSessionExpired || isForceLogout;

  return { isExpired };
}

export { clearExpiredSession, useSessionExpiration };
