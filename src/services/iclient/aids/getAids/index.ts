import { enviroment } from "@config/enviroment";
import { IAid } from "src/model/entity/service";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapAidsApiToEntities } from "./mappers";

const getAidsForUser = async (
  userIdentification: string,
  accessToken: string,
): Promise<IAid[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    customerCode: userIdentification,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/aid-products?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAidProducts",
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
        message: "Error al obtener los auxilios del usuario",
        status: res.status,
        data,
      };
    }

    const normalizedAids = Array.isArray(data)
      ? mapAidsApiToEntities(data)
      : [];

    return normalizedAids;
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

export { getAidsForUser };
