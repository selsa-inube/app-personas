import { enviroment } from "@config/enviroment";
import { IPeriodicity } from "src/model/entity/periodicity";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapPeriodicitiesApiToEntities } from "./mappers";

const getPeriodicitiesForProduct = async (
  accessToken: string,
  paymentId: string,
): Promise<IPeriodicity[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    payrollCode: paymentId,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/payrolls/?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllPayroll",
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
        message: "Error al obtener los periodicidades del producto.",
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

    console.info(error);

    throw error;
  }
};

export { getPeriodicitiesForProduct };
