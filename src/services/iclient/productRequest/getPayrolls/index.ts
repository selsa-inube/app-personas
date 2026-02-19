import { enviroment } from "@config/enviroment";
import { IOption } from "@inubekit/inubekit";
import { RequestType } from "src/model/entity/request";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapPayrollsApiToEntities } from "./mappers";

const getPayrollsForProduct = async (
  requestType: RequestType,
  productId: string,
  accessToken: string,
  userIdentification: string,
): Promise<IOption[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/payrolls/customer-code/${userIdentification}/product/${productId}/request-type/${requestType}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchBusinessUnitPayrolls",
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
        message: "Error al obtener las nominas del producto",
        status: res.status,
        data,
      };
    }

    const normalizedPayrolls = Array.isArray(data)
      ? mapPayrollsApiToEntities(data)
      : [];

    return normalizedPayrolls;
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

export { getPayrollsForProduct };
