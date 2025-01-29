import { enviroment } from "@config/enviroment";
import { IPaymentHistory } from "src/model/entity/payment";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapPaymentsHistoryApiToEntities } from "./mappers";

const getPaymentHistory = async (
  userIdentification: string,
  accessToken: string,
  page: number,
  limit: number,
): Promise<IPaymentHistory[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    clientCode: userIdentification,
    page: String(page),
    per_page: String(limit),
    sort: "desc.payDay",
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/payment-history?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllPaymentHistory",
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

    if (!res.ok) {
      throw {
        message: "Error al obtener el historial de pagos del usuario.",
        status: res.status,
      };
    }

    const data = await res.json();

    const normalizedPaymentHistory = Array.isArray(data)
      ? mapPaymentsHistoryApiToEntities(data)
      : [];

    return normalizedPaymentHistory;
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

export { getPaymentHistory };
