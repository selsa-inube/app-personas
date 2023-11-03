import { useEffect, useState } from "react";
import { IUser } from "../types";
import {
  getAccessToken,
  getAuthorizationCode,
  requestAuthorizationCode,
  verifyAccessToken,
} from "../utils/authorization";

interface IUseAuth {
  clientId: string;
  clientSecret: string;
  realm: string;
  redirectUri: string;
  scopes?: string[];
}

function useAuth(props: IUseAuth) {
  const { clientId, clientSecret, realm, redirectUri, scopes } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser>();

  const loginWithRedirect = async () => {
    const { authorizationCode, state } = getAuthorizationCode();

    if (!authorizationCode || !state) {
      requestAuthorizationCode(
        clientId,
        clientSecret,
        realm,
        redirectUri,
        scopes
      );
      return;
    }

    const accessToken = await getAccessToken(
      authorizationCode,
      clientId,
      clientSecret,
      realm,
      redirectUri
    );

    if (!accessToken) return;

    const verificationData = await verifyAccessToken(accessToken.token, realm);

    if (!verificationData) return;

    setUser(verificationData.user);
    sessionStorage.setItem("user", JSON.stringify(verificationData.user));

    setIsAuthenticated(true);
    setIsLoading(false);

    window && window.location.replace(redirectUri);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(undefined);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  };
}

export default useAuth;
