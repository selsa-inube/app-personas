import { enviroment } from "@config/enviroment";
import { IMovement } from "src/model/entity/product";
import { mapCreditMovementsApiToEntities } from "./mappers";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";

const getMovementsForCredit = async (
  creditId: string,
  accessToken: string,
): Promise<IMovement[]> => {
  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/portfolio-obligations/${creditId}/last-movement`;

  const options = {
    method: "GET",
    headers: {
      Realm: enviroment.REALM,
      Authorization: `Bearer ${accessToken}`,
      "X-Action": "SearchLastMovementsByObligationNumber",
      "X-Business-Unit": enviroment.BUSINESS_UNIT,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const startTime = performance.now();
  const requestTime = new Date();
  let responseTimeMs;
  let responseStatusCode;

  const trackNetworkRequest = async (
    requestTime: Date,
    responseStatusCode: number,
    responseTimeMs: number,
  ) => {
    if (enviroment.IS_PRODUCTION) {
      await saveNetworkTracking(
        requestTime,
        options.method || "GET",
        requestUrl,
        responseStatusCode,
        responseTimeMs,
      );
    }
  };

  try {
    const res = await fetch(requestUrl, options);

    responseTimeMs = Math.round(performance.now() - startTime);
    responseStatusCode = res.status;

    await trackNetworkRequest(requestTime, responseStatusCode, responseTimeMs);

    if (res.status === 204) {
      return [];
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener los movimentos del crédito",
        status: res.status,
        data,
      };
    }

    return Array.isArray(data) ? mapCreditMovementsApiToEntities(data) : [];
  } catch (error) {
    await trackNetworkRequest(
      requestTime,
      (responseStatusCode = 400),
      (responseTimeMs = Math.round(performance.now() - startTime)),
    );
    console.error(error);
    throw error;
  }
};

export { getMovementsForCredit };
