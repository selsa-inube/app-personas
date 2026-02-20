import { enviroment } from "@config/enviroment";
import { IProduct } from "src/model/entity/product";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapCreditQuotaDetailApiToEntity } from "./mappers";

const getDetailForCreditQuota = async (
  cardNumber: string,
  accessToken: string,
): Promise<IProduct | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/credit-card-products/${cardNumber}/detail`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchCreditProductsDetail",
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

    const normalizedCreditQuotaDetail =
      Object.keys(data).length === 0
        ? undefined
        : mapCreditQuotaDetailApiToEntity(data);

    return normalizedCreditQuotaDetail;
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

export { getDetailForCreditQuota };
