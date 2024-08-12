import { enviroment } from "@config/enviroment";
import { IPeriodicity } from "src/model/entity/periodicity";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapPeriodicitiesApiToEntities } from "./mappers";

const getPeriodicityForProduct = async (
  accessToken: string,
  productId: string,
  paymentId: string,
): Promise<IPeriodicity[]> => {
  const fetchTimeout = 3000;
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/manage-product-request/payment-method/product/${productId}}/payment/${paymentId}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchPeriodicitiesByProductAndPaymentMethod",
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
        message: "Error al obtener los periodicidades de crédito del usuario.",
        status: res.status,
        data,
      };
    }

    const normalizedPeriodicities = Array.isArray(data)
      ? mapPeriodicitiesApiToEntities(data)
      : [];

    return normalizedPeriodicities;
  } catch (error) {
    saveNetworkTracking(
      requestTime,
      "GET",
      requestUrl,
      (error as { status?: number }).status || 500,
      Math.round(performance.now() - startTime),
    );

    throw new Error(
      "Todos los intentos fallaron. No se pudieron obtener las periodicidades del crédito del usuario.",
    );
  }
};

export { getPeriodicityForProduct };
