import { enviroment } from "@config/enviroment";
import { IPQRS } from "src/model/entity/pqrs";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapPqrsHistoryApiToEntities } from "./mappers";

const getPqrsHistory = async (
  userIdentification: string,
  accessToken: string,
): Promise<IPQRS[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    clientCode: userIdentification,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/pqrs?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllPQRS",
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

    if (!res.ok) {
      throw {
        message: "Error al obtener el historial de pqrs.",
        status: res.status,
      };
    }

    const data = await res.json();

    const normalizedPqrsHistory = Array.isArray(data)
      ? mapPqrsHistoryApiToEntities(data)
      : [];

    return normalizedPqrsHistory;
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

export { getPqrsHistory };
