import { enviroment } from "@config/enviroment";
import { ISelectOption } from "@design/input/Select/types";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapPaymentMethodsApiToEntities } from "./mappers";

const getPaymentMethodsForUser = async (
  userIdentification: string,
  accessToken: string,
  productId: string,
): Promise<ISelectOption[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/manage-product-request/payment-method/product/${productId}}/customer/${userIdentification}`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          Realm: enviroment.REALM,
          Authorization: `Bearer ${accessToken}`,
          "X-Action": "SearchPaymentMethodsByProduct",
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
          message: "Error al obtener los métodos de pago del usuario.",
          status: res.status,
          data,
        };
      }

      const normalizedPaymentMethods = Array.isArray(data)
        ? mapPaymentMethodsApiToEntities(data)
        : [];

      return normalizedPaymentMethods;
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
          "Todos los intentos fallaron. No se pudieron obtener los métodos de pago.",
        );
      }
    }
  }

  return [];
};

export { getPaymentMethodsForUser };
