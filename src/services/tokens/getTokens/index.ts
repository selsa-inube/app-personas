import { enviroment } from "@config/enviroment";
import { IThemeData } from "@utils/themes";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import {  mapTokensApiToEntity } from "./mappers";

const getTokens = async (): Promise<IThemeData | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.INUBEKIT_TOKENS_API_URL}/tokens/${enviroment.BUSINESS_UNIT}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(requestUrl, options);

    saveNetworkTracking(
      requestTime,
      options.method || "GET",
      requestUrl,
      res.status,
      Math.round(performance.now() - startTime),
    );

    if (res.status === 204) {
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener los tokens de la unidad de negocio",
        status: res.status,
        data,
      };
    }

    const normalizedTokens = mapTokensApiToEntity(data);

    return normalizedTokens;
  } catch (error) {
    saveNetworkTracking(
      requestTime,
      "GET",
      requestUrl,
      (error as { status?: number }).status || 500,
      Math.round(performance.now() - startTime),
    );

    console.info(error);

    throw error;
  }
};

export { getTokens };
