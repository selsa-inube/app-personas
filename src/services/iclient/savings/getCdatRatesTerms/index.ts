import { enviroment } from "@config/enviroment";
import { IRateTerm } from "@pages/request/savings/CdatRequest/forms/DeadlineForm/types";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapRateTermsApiToEntities } from "./mappers";

const getCdatRateTerms = async (
  accessToken: string,
  productId: string,
  investmentValue: number,
): Promise<IRateTerm[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/cdats/${productId}/${investmentValue}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchRatesAndTerms",
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
        message: "Error al obtener las tasas y plazos del cdat",
        status: res.status,
        data,
      };
    }

    const normalizedRatesTerms = Array.isArray(data)
      ? mapRateTermsApiToEntities(data)
      : [];

    return normalizedRatesTerms;
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

export { getCdatRateTerms };
