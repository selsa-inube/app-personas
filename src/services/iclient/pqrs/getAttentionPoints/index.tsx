import { enviroment } from "@config/enviroment";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapAttentionPointsApiToEntities } from "./mappers";
import { ISelectOption } from "@design/input/Select/types";

const getAttentionPoints = async (
  accessToken: string,
): Promise<ISelectOption[]> => {
  const requestTime = new Date();
  const startTime = performance.now();
  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/pqrs`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAttentionPlaces",
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
      return [];
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener los puntos de atención.",
        status: res.status,
        data,
      };
    }

    return mapAttentionPointsApiToEntities(data);
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

export { getAttentionPoints };
