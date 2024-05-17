import { enviroment } from "@config/enviroment";
import { developmentUsersMock } from "@mocks/users/users.mocks";
import { IProduct } from "src/model/entity/product";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapCreditsApiToEntities } from "./mappers";

const getCreditsForUser = async (
  userIdentification: string,
  accessToken: string,
): Promise<IProduct[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    customerPublicCode:
      developmentUsersMock[userIdentification] || userIdentification,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/portfolio-obligations?${queryParams.toString()}`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          Realm: enviroment.REALM,
          Authorization: `Bearer ${accessToken}`,
          "X-Action": "SearchGeneralInformationObligation",
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

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los créditos del usuario",
          status: res.status,
          data,
        };
      }

      const normalizedCredits = Array.isArray(data)
        ? mapCreditsApiToEntities(data)
        : [];

      return normalizedCredits;
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
          "Todos los intentos fallaron. No se pudieron obtener los créditos del usuario.",
        );
      }
    }
  }

  return [];
};

export { getCreditsForUser };
