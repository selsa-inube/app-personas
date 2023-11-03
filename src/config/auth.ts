const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REALM = "";
const HOST = import.meta.env.DEV
  ? "http://localhost:3000"
  : import.meta.env.BASE_URL;

const authConfig = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  realm: REALM,
  redirectUri: HOST,
  scopes: ["openid", "profile", "email", "identityDocument"],
};

export { authConfig };
