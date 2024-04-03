import { enviroment } from "@config/enviroment";
import { IProduct } from "src/model/entity/product";
import { mapCreditQuotaDetailsApiToEntity } from "./mappers";

const getCreditQuotasDetailsForUser = async (
  cardId: string,
  accessToken: string,
): Promise<IProduct | undefined> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          Realm: enviroment.REALM,
          Authorization: `Bearer ${accessToken}`,
          "X-Action": "SearchCreditProductsDetail",
          "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.ICLIENT_API_URL_QUERY}/credit-card-products/${cardId}/detail`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener las tarjetas del usuario",
          status: res.status,
          data,
        };
      }

      const normalizedCreditQuotaDetails =
        Object.keys(data).length === 0
          ? undefined
          : mapCreditQuotaDetailsApiToEntity(data);

      return normalizedCreditQuotaDetails;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los cupos de credito del usuario.",
        );
      }
    }
  }

  return;
};

export { getCreditQuotasDetailsForUser };
