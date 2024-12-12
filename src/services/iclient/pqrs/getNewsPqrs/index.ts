import { INew } from "@components/cards/RequestNews/types";
import { enviroment } from "@config/enviroment";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapNewsPqrsApiToEntities } from "./mappers";

const getNewsForPqrs = async (
  PqrsId: string,
  accessToken: string,
): Promise<INew[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    PQRSId: PqrsId,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/pqrs-logs?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllPQRSLog",
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
        message: "Error al obtener las novedades de la pqrs",
        status: res.status,
        data,
      };
    }

    const normalizedResponse = Array.isArray(data)
      ? mapNewsPqrsApiToEntities(data)
      : [];

    return normalizedResponse;
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

export { getNewsForPqrs };
