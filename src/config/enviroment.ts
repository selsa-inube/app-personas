import { capitalizeText } from "@utils/texts";
import { getBusinessUnitSubdomain } from "src/utils/business";

const authCredentials: Record<string, { realm: string }> = {
  fondecom: {
    realm: import.meta.env.VITE_AUTH_FONDECOM_REALM,
  },
  feproteccion: {
    realm: import.meta.env.VITE_AUTH_FEPROTECCION_REALM,
  },
};

const enviroment = {
  IS_PRODUCTION: import.meta.env.PROD,
  AUTH_CLIENT_ID: import.meta.env.VITE_AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET: import.meta.env.VITE_AUTH_CLIENT_SECRET,
  AUTH_REALM: authCredentials[getBusinessUnitSubdomain()].realm,
  AUTH_PROVIDER: import.meta.env.VITE_AUTH_PROVIDER,
  ICLIENT_API_URL_QUERY: import.meta.env.VITE_ICLIENT_API_URL_QUERY,
  ICLIENT_API_URL_PERSISTENCE: import.meta.env.VITE_ICLIENT_API_URL_PERSISTENCE,
  BUSINESS_UNIT: getBusinessUnitSubdomain(),
  CLIENT_NAME: capitalizeText(getBusinessUnitSubdomain()),
  APP_CODE: "personas",
  FEATURE_FLAGS_URL: import.meta.env.VITE_FEATURE_FLAGS_URL,
  FEATURE_FLAGS_KEY: import.meta.env.VITE_FEATURE_FLAGS_KEY,
  ANALYTICS_URL: import.meta.env.VITE_ANALYTICS_URL,
  ANALYTICS_KEY: import.meta.env.VITE_ANALYTICS_KEY,
  TEAMS_WEBHOOK:
    "https://senlinea.webhook.office.com/webhookb2/34a9dbd2-ebc4-48c4-8821-9497fa2c3b47@274e76db-8d04-4110-abca-44dc583def79/IncomingWebhook/43f7251bcf3c4dfe923500adc52837cc/523e4558-3102-4d0d-b633-e00a21cc58dd",
};

export { enviroment };
