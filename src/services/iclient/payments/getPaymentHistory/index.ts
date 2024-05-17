import { enviroment } from "@config/enviroment";
import { IPaymentHistory } from "src/model/entity/payment";
import { mapPaymentHistoryApiToEntities } from "./mappers";

const getPaymentHistory = async (
  userIdentification: string,
  accessToken: string,
  page: number,
  limit: number,
): Promise<IPaymentHistory[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        clientCode: userIdentification,
        page: String(page),
        per_page: String(limit),
        sort: "desc.payDay",
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          Realm: enviroment.REALM,
          Authorization: `Bearer ${accessToken}`,
          "X-Action": "SearchAllPaymentHistory",
          "X-Business-Unit": enviroment.BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${
          enviroment.ICLIENT_API_URL_QUERY
        }/payment-history?${queryParams.toString()}`,
        options,
      );

      clearTimeout(timeoutId);

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
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener el historial de pagos.",
        );
      }
    }
  }

  return [];
};

export { getPaymentHistory };
