import { enviroment } from "@config/enviroment";
import { ITransfer } from "src/model/entity/transfer";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapTransfersHistoryApiToEntities } from "./mappers";

const getTransferHistory = async (
  userIdentification: string,
  accessToken: string,
  page: number,
  limit: number,
): Promise<ITransfer[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    clientCode: userIdentification,
    page: String(page),
    per_page: String(limit),
    sort: "desc.transferDate",
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/transfer?${queryParams.toString()}`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          Realm: enviroment.REALM,
          Authorization: `Bearer ${accessToken}`,
          "X-Action": "SearchAllTransfer",
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
          message:
            "Error al obtener el historial de transferencias del usuario.",
          status: res.status,
        };
      }

      const data = await res.json();

      const normalizedTransferHistory = Array.isArray(data)
        ? mapTransfersHistoryApiToEntities(data)
        : [];

      return normalizedTransferHistory;
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
          "Todos los intentos fallaron. No se pudo obtener el historial de transferencias.",
        );
      }
    }
  }

  return [];
};

export { getTransferHistory };
