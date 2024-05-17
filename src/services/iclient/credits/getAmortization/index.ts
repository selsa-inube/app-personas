import { enviroment } from "@config/enviroment";
import { IAmortization } from "src/model/entity/product";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapCreditAmortizationApiToEntities } from "./mappers";

const getAmortizationForCredit = async (
  creditId: string,
  accessToken: string,
): Promise<IAmortization[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/portfolio-obligations/${creditId}/payment-plan`;

  try {
    const options = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchPaymentPlanByObligationNumber",
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
        message: "Error al obtener la amortización del crédito",
        status: res.status,
        data,
      };
    }

    return Array.isArray(data) ? mapCreditAmortizationApiToEntities(data) : [];
  } catch (error) {
    saveNetworkTracking(
      requestTime,
      "GET",
      requestUrl,
      (error as { status?: number }).status || 500,
      Math.round(performance.now() - startTime),
    );

    console.error(error);
    throw error;
  }
};

export { getAmortizationForCredit };
