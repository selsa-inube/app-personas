import { generateCodeChallengePair, generateState } from "src/utils/codes";

const SERVICE_URL =
  "https://odin.selsacloud.com/linix/v7/da77663b-eeaf-42a0-a093-5efbdb1e54d2/servicio/identidad";

const getAuthorizationCode = () => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const authorizationCode = searchParams.get("code");
  const state = searchParams.get("state");

  return {
    authorizationCode,
    state,
  };
};

interface IAuthorizationCodeResponse {
  state: string;
  redirectUri: string;
}

const requestAuthorizationCode = async (
  cliendId: string,
  clientSecret: string,
  realm: string
) => {
  try {
    const bodyParams = new URLSearchParams();
    bodyParams.append("response_type", "code");
    bodyParams.append("response_mode", "query");
    bodyParams.append("state", generateState());
    bodyParams.append("redirect_uri", "http://localhost:3000");
    bodyParams.append("client_id", cliendId);
    bodyParams.append("client_secret", clientSecret);
    bodyParams.append("redirect", "false");
    bodyParams.append("scope", "openid profile email identityDocument");

    const res = await fetch(`${SERVICE_URL}/oauth2/autorizar`, {
      method: "POST",
      headers: {
        Realm: realm,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams.toString(),
    });

    const data = await res.json();

    if (data.state && data.redirect_uri) {
      window.location.replace(data.redirect_uri);
      const authorizationCodeResponse: IAuthorizationCodeResponse = {
        state: data.state,
        redirectUri: data.redirect_uri,
      };
      return authorizationCodeResponse;
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

interface IAccessTokenResponse {
  token: string;
  tokenType: number;
  expiresIn: string;
  refreshToken: string;
  realm: string;
}

const getAccessToken = async (
  code: string,
  cliendId: string,
  clientSecret: string,
  realm: string
) => {
  try {
    const codeChallengePair = await generateCodeChallengePair();

    const bodyParams = new URLSearchParams();
    bodyParams.append("redirect_uri", "http://localhost:3000");
    bodyParams.append("code", code);
    bodyParams.append("client_id", cliendId);
    bodyParams.append("client_secret", clientSecret);
    bodyParams.append("code_verifier", codeChallengePair.codeVerifier);
    bodyParams.append("code_challenge", codeChallengePair.codeChallenge);
    bodyParams.append("code_challenge_method", "S256");
    bodyParams.append("grant_type", "authorization_code");

    const res = await fetch(`${SERVICE_URL}/oauth2/token`, {
      method: "POST",
      headers: {
        Realm: realm,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams.toString(),
    });

    const data = await res.json();

    if (
      data.access_token &&
      data.token_type &&
      data.refresh_token &&
      data.realm
    ) {
      const accessTokenResponse: IAccessTokenResponse = {
        token: data.access_token,
        tokenType: data.token_type,
        expiresIn: data.expires_in,
        refreshToken: data.refresh_token,
        realm: data.realm,
      };

      return accessTokenResponse;
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

interface IVerifyAccessTokenResponse {
  expireIn: number;
  scopes: string[];
  user: {
    id: string;
    login: string;
    url: string;
  };
}

const verifyAccessToken = async (accessToken: string, realm: string) => {
  try {
    console.log(accessToken);
    const res = await fetch(`${SERVICE_URL}/oauth2/token/${realm}/info`, {
      method: "GET",
      headers: {
        /* Realm: realm, */
        "Content-Type": "application/json",
        Authorization: `1/${accessToken}`,
      },
    });

    if (!res.ok) console.log(res.statusText);

    const data = await res.json();
    console.log(data);
    if (data.expire_in && data.scopes && data.user) {
      const verifyAccessTokenResponse: IVerifyAccessTokenResponse = {
        expireIn: data.expire_in,
        scopes: data.scopes,
        user: {
          id: data.user.id,
          login: data.user.login,
          url: data.user.url,
        },
      };

      return verifyAccessTokenResponse;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const validateUser = async (
  cliendId: string,
  clientSecret: string,
  realm: string
) => {
  const user = sessionStorage.getItem("user");

  if (!user) {
    const { authorizationCode, state } = getAuthorizationCode();
    if (!authorizationCode || !state) {
      requestAuthorizationCode(cliendId, clientSecret, realm);
      return;
    }

    const accessToken = await getAccessToken(
      authorizationCode,
      cliendId,
      clientSecret,
      realm
    );
    console.log(accessToken);

    if (!accessToken) return;

    const verifyResult = await verifyAccessToken(accessToken?.token, realm);
    console.log(verifyResult);
  }
};

export { validateUser };
