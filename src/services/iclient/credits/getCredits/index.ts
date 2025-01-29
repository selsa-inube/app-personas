import { enviroment } from "@config/enviroment";
import { IProduct } from "src/model/entity/product";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapCreditsApiToEntities } from "./mappers";

const getCreditsForUser = async (
  userIdentification: string,
  accessToken: string,
): Promise<IProduct[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    customerCode: userIdentification,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/portfolio-obligations?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchGeneralInformationObligation",
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
        message: "Error al obtener los créditos del usuario",
        status: res.status,
        data,
      };
    }

    const normalizedCredits = Array.isArray(data)
      ? mapCreditsApiToEntities(data)
      : [];

    return normalizedCredits;
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

export { getCreditsForUser };
