import { enviroment } from "@config/enviroment";
import { developmentUsersMock } from "@mocks/users/users.mocks";
import { IPaymentHistory } from "src/model/entity/payment";
import { mapPaymentHistoryApiToEntities } from "./mappers";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";

const getPaymentHistory = async (
  userIdentification: string,
  accessToken: string,
  page: number,
  limit: number,
): Promise<IPaymentHistory[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;

  const queryParams = new URLSearchParams({
    clientCode: developmentUsersMock[userIdentification] || userIdentification,
    page: String(page),
    per_page: String(limit),
    sort: "desc.payDay",
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/payment-history?${queryParams.toString()}`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      Realm: enviroment.REALM,
      Authorization: `Bearer ${accessToken}`,
      "X-Action": "SearchAllPaymentHistory",
      "X-Business-Unit": enviroment.BUSINESS_UNIT,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

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

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const startTime = performance.now();
    const requestTime = new Date();
    let responseTimeMs;
    let responseStatusCode;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const res = await fetch(requestUrl, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      responseTimeMs = Math.round(performance.now() - startTime);
      responseStatusCode = res.status;

      await trackNetworkRequest(
        requestTime,
        responseStatusCode,
        responseTimeMs,
      );

      if (res.status === 204) {
        return [];
      }

      if (!res.ok) {
        throw {
          message: "Error al obtener el historial de pagos del usuario.",
          status: res.status,
        };
      }

      const data = await res.json();

      const normalizedPaymentHistory = Array.isArray(data)
        ? mapPaymentHistoryApiToEntities(data)
        : [];

      return normalizedPaymentHistory;
    } catch (error) {
      if (attempt === maxRetries) {
        await trackNetworkRequest(
          requestTime,
          (responseStatusCode = 400),
          (responseTimeMs = Math.round(performance.now() - startTime)),
        );
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener el historial de pagos.",
        );
      }
    }
  }

  return [];
};

export { getPaymentHistory };
