import { enviroment } from "@config/enviroment";
import { IProduct } from "src/model/entity/product";
import { mapCardsApiToEntities } from "./mappers";

const getCardsForUser = async (
  userIdentification: string,
  accessToken: string,
  savingAccounts: IProduct[],
): Promise<IProduct[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        customerPublicCode: userIdentification,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          Realm: enviroment.REALM,
          Authorization: `Bearer ${accessToken}`,
          "X-Action": "SearchAllCard",
          "X-Business-Unit": enviroment.BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.ICLIENT_API_URL_QUERY}/cards?${queryParams.toString()}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener las tarjetas del usuario",
          status: res.status,
          data,
        };
      }

      const normalizedCredits = Array.isArray(data)
        ? mapCardsApiToEntities(data, savingAccounts)
        : [];

      return normalizedCredits;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener las tarjetas del usuario.",
        );
      }
    }
  }

  return [];
};

export { getCardsForUser };
