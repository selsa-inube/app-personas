import { enviroment } from "@config/enviroment";
import { IRequest } from "src/model/entity/request";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapRequestsApiToEntities } from "./mappers";

const getRequests = async (
  userIdentification: string,
  accessToken: string,
  page: number,
  limit: number,
): Promise<IRequest[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    customerCode: userIdentification,
    page: String(page),
    per_page: String(limit),
    sort: "desc.requestDate",
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/request?${queryParams.toString()}`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          Realm: enviroment.REALM,
          Authorization: `Bearer ${accessToken}`,
          "X-Action": "SearchAllRequest",
          "X-Business-Unit": enviroment.BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(requestUrl, options);

      clearTimeout(timeoutId);

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
          message: "Error al obtener el historial de solicitudes",
          status: res.status,
        };
      }

      const data = await res.json();

      const normalizedResponse = Array.isArray(data)
        ? mapRequestsApiToEntities(data)
        : [];

      return normalizedResponse;
    } catch (error) {
      if (attempt === maxRetries) {
        saveNetworkTracking(
          requestTime,
          "GET",
          requestUrl,
          (error as { status?: number }).status || 500,
          Math.round(performance.now() - startTime),
        );

        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener el historial de solicitudes.",
        );
      }
    }
  }

  return [];
};

export { getRequests };
