import { enviroment } from "@config/enviroment";
import { ISelectOption } from "@design/input/Select/types";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapDisbursementsApiToEntities } from "./mappers";

const getDisbursementsForProduct = async (
  requestType: string,
  productId: string,
  accessToken: string,
): Promise<ISelectOption[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    requestType,
    productId,
    allowed: true.toString(),
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/manage-product-request/disbursement-method/?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllowableMethodOfDisbursement",
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
        message: "Error al obtener las formas de desembolso del producto",
        status: res.status,
        data,
      };
    }

    const normalizedDisbursements = Array.isArray(data)
      ? mapDisbursementsApiToEntities(data)
      : [];

    return normalizedDisbursements;
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

export { getDisbursementsForProduct };
