import { getBusinessUnitSubdomain } from "src/utils/business";

const clientMap: Record<string, { realm: string; name: string }> = {
  fondecom: {
    realm: import.meta.env.VITE_AUTH_FONDECOM_REALM,
    name: "Fondecom",
  },
  feproteccion: {
    realm: import.meta.env.VITE_AUTH_FEPROTECCION_REALM,
    name: "Feprotección",
  },
  cooptraiss: {
    realm: import.meta.env.VITE_AUTH_COOPTRAISS_REALM,
    name: "Cooptraiss",
  },
  coopebis: {
    realm: import.meta.env.VITE_AUTH_COOPEBIS_REALM,
    name: "Coopebis",
  },
  grancoop: {
    realm: import.meta.env.VITE_AUTH_GRANCOOP_REALM,
    name: "Grancoop",
  },
  prosel: {
    realm: import.meta.env.VITE_AUTH_PROSEL_REALM,
    name: "Prosel",
  },
  febanc: {
    realm: import.meta.env.VITE_AUTH_FEBANC_REALM,
    name: "Febanc",
  },
  feavanza: {
    realm: import.meta.env.VITE_AUTH_FEAVANZA_REALM,
    name: "Feavanza",
  },
  coopcarvajal: {
    realm: import.meta.env.VITE_AUTH_COOPCARVAJAL_REALM,
    name: "Coopcarvajal",
  },
};

const enviroment = {
  IS_PRODUCTION: import.meta.env.PROD,
  AUTH_CLIENT_ID: import.meta.env.VITE_AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET: import.meta.env.VITE_AUTH_CLIENT_SECRET,
  AUTH_REALM: clientMap[getBusinessUnitSubdomain()].realm,
  AUTH_PROVIDERS: import.meta.env.VITE_AUTH_PROVIDERS,
  ICLIENT_API_URL_QUERY: import.meta.env.VITE_ICLIENT_API_URL_QUERY,
  ICLIENT_API_URL_PERSISTENCE: import.meta.env.VITE_ICLIENT_API_URL_PERSISTENCE,
  INUBEKIT_TOKENS_API_URL: import.meta.env.VITE_INUBEKIT_TOKENS_API_URL,
  BUSINESS_UNIT: getBusinessUnitSubdomain(),
  CLIENT_NAME: clientMap[getBusinessUnitSubdomain()].name,
  APP_CODE: "personas",
  FEATURE_FLAGS_URL: import.meta.env.VITE_FEATURE_FLAGS_URL,
  FEATURE_FLAGS_KEY: import.meta.env.VITE_FEATURE_FLAGS_KEY,
  ANALYTICS_URL: import.meta.env.VITE_ANALYTICS_URL,
  ANALYTICS_KEY: import.meta.env.VITE_ANALYTICS_KEY,
  WITH_AUTO_SIGNOUT: import.meta.env.VITE_WITH_AUTO_SIGNOUT === "true",
  SIGNOUT_TIME: import.meta.env.VITE_SIGNOUT_TIME,
  RESET_SIGNOUT_MOUSE_MOVE:
    import.meta.env.VITE_RESET_SIGNOUT_MOUSE_MOVE === "true",
  RESET_SIGNOUT_KEY_DOWN:
    import.meta.env.VITE_RESET_SIGNOUT_KEY_DOWN === "true",
  RESET_SIGNOUT_MOUSE_DOWN:
    import.meta.env.VITE_RESET_SIGNOUT_MOUSE_DOWN === "true",
  RESET_SIGNOUT_SCROLL: import.meta.env.VITE_RESET_SIGNOUT_SCROLL === "true",
  RESET_SIGNOUT_TOUCHSTART:
    import.meta.env.VITE_RESET_SIGNOUT_TOUCHSTART === "true",
  RESET_SIGNOUT_CHANGE_PAGE:
    import.meta.env.VITE_RESET_SIGNOUT_CHANGE_PAGE === "true",
  TEAMS_WEBHOOK:
    "https://senlinea.webhook.office.com/webhookb2/34a9dbd2-ebc4-48c4-8821-9497fa2c3b47@274e76db-8d04-4110-abca-44dc583def79/IncomingWebhook/43f7251bcf3c4dfe923500adc52837cc/523e4558-3102-4d0d-b633-e00a21cc58dd",
};

export { enviroment };
