import {
  generateCodeChallengePair,
  generateState,
} from "src/services/identidad/utils/codes";
import { IUser } from "../types";

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
  clientId: string,
  clientSecret: string,
  realm: string,
  redirectUri: string,
  scopes?: string[]
) => {
  try {
    const scope = scopes ? scopes.join(" ") : "openid";
    const bodyParams = new URLSearchParams();
    bodyParams.append("response_type", "code");
    bodyParams.append("response_mode", "query");
    bodyParams.append("state", generateState());
    bodyParams.append("redirect_uri", redirectUri);
    bodyParams.append("client_id", clientId);
    bodyParams.append("client_secret", clientSecret);
    bodyParams.append("redirect", "false");
    bodyParams.append("scope", scope);

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
    console.error("Error:", error);
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
  clientId: string,
  clientSecret: string,
  realm: string,
  redirectUri: string
) => {
  try {
    const codeChallengePair = await generateCodeChallengePair();

    const bodyParams = new URLSearchParams();
    bodyParams.append("redirect_uri", redirectUri);
    bodyParams.append("code", code);
    bodyParams.append("client_id", clientId);
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
    console.error("Error:", error);
  }
};

interface IVerifyAccessTokenResponse {
  expireIn: number;
  idSesion: string;
  user: IUser;
}

const verifyAccessToken = async (accessToken: string, realm: string) => {
  try {
    const res = await fetch(`${SERVICE_URL}/oauth2/token/${realm}/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `1/${accessToken}`,
      },
    });

    const data = await res.json();

    if (data.expires_in && data.idSesion && data.usuario) {
      const verifyAccessTokenResponse: IVerifyAccessTokenResponse = {
        expireIn: data.expires_in,
        idSesion: data.idSesion,
        user: {
          id: data.usuario.id,
          company: data.usuario.repositorio,
          email: data.usuario.correoElectronico,
          firstName: data.usuario.primerNombre,
          secondName: data.usuario.segundoNombre,
          firstLastName: data.usuario.primerApellido,
          secondLastName: data.usuario.segundoApellido,
          identification: data.usuario.identificacion,
          phone: data.usuario.telefonoMovil,
        },
      };

      return verifyAccessTokenResponse;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export {
  getAccessToken,
  getAuthorizationCode,
  requestAuthorizationCode,
  verifyAccessToken,
};
