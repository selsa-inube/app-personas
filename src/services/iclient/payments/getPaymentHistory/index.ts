import { enviroment } from "@config/enviroment";
import { developmentUsersMock } from "@mocks/users/users.mocks";
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
        clientCode:
          developmentUsersMock[userIdentification] || userIdentification,
        page: String(page),
        per_page: String(limit),
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          Realm: enviroment.REALM,
          Authorization: `Bearer ${accessToken}`,
          "X-Action": "SearchAllPaymentHistory",
          "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
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

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los créditos del usuario",
          status: res.status,
          data,
        };
      }

      const normalizedPaymentHistory = Array.isArray(data)
        ? mapPaymentHistoryApiToEntities(data)
        : [];

      return normalizedPaymentHistory;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los créditos del usuario.",
        );
      }
    }
  }

  return [];
};

export { getPaymentHistory };
