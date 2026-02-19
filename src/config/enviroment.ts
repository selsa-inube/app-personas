import { ProviderType } from "@inube/auth";
import { getBusinessUnitSubdomain } from "src/utils/business";

const clientMap: Record<string, { realm: string; name: string }> = {
  fondecom: {
    realm: import.meta.env.VITE_AUTH_FONDECOM_PARAM,
    name: "Fondecom",
  },
  feproteccion: {
    realm: import.meta.env.VITE_AUTH_FEPROTECCION_PARAM,
    name: "Feprotección",
  },
  cooptraiss: {
    realm: import.meta.env.VITE_AUTH_COOPTRAISS_PARAM,
    name: "Cooptraiss",
  },
  coopebis: {
    realm: import.meta.env.VITE_AUTH_COOPEBIS_PARAM,
    name: "Coopebis",
  },
  grancoop: {
    realm: import.meta.env.VITE_AUTH_GRANCOOP_PARAM,
    name: "Grancoop",
  },
  prosel: {
    realm: import.meta.env.VITE_AUTH_PROSEL_PARAM,
    name: "Prosel",
  },
  febanc: {
    realm: import.meta.env.VITE_AUTH_FEBANC_PARAM,
    name: "Febanc",
  },
  feavanza: {
    realm: import.meta.env.VITE_AUTH_FEAVANZA_PARAM,
    name: "Feavanza",
  },
  coopcarvajal: {
    realm: import.meta.env.VITE_AUTH_COOPCARVAJAL_PARAM,
    name: "Coopcarvajal",
  },
  coopetrol: {
    realm: import.meta.env.VITE_AUTH_COOPETROL_PARAM,
    name: "Coopetrol",
  },
  manpower: {
    realm: import.meta.env.VITE_AUTH_MANPOWER_PARAM,
    name: "Manpower",
  },
  favuis: {
    realm: import.meta.env.VITE_AUTH_FAVUIS_PARAM,
    name: "Favuis",
  },
  feselsa: {
    realm: import.meta.env.VITE_AUTH_FESELSA_PARAM,
    name: "Feselsa",
  },
  fedejohnson: {
    realm: import.meta.env.VITE_AUTH_FEDEJOHNSON_PARAM,
    name: "Fedejohnson",
  },
};

const enviroment = {
  IS_PRODUCTION: import.meta.env.PROD,
  AUTH_CLIENT_ID: import.meta.env.VITE_AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET: import.meta.env.VITE_AUTH_CLIENT_SECRET,
  AUTH_PARAM: clientMap[getBusinessUnitSubdomain()].realm.split(":")[0],
  AUTH_PROVIDER: clientMap[getBusinessUnitSubdomain()].realm.split(
    ":",
  )[1] as ProviderType,
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
