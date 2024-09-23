import { enviroment } from "@config/enviroment";
import { ISelectOption } from "@design/input/Select/types";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapPaymentMethodsApiToEntities } from "./mappers";

const getPaymentMethodsForProduct = async (
  userIdentification: string,
  accessToken: string,
  productId: string,
): Promise<ISelectOption[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/manage-product-request/payment-method/product/${productId}}/customer/${userIdentification}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchPaymentMethodsByProduct",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(requestUrl, options);

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
    saveNetworkTracking(
      requestTime,
      "GET",
      requestUrl,
      (error as { status?: number }).status || 500,
      Math.round(performance.now() - startTime),
    );

    console.info(error);

    throw error;
  }
};

export { getPaymentMethodsForProduct };
