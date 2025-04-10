import { enviroment } from "@config/enviroment";
import { IOption } from "@inubekit/inubekit";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapCitiesApiToEntities } from "./mappers";

const getCities = async (
  accessToken: string,
): Promise<IOption[] | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    page: String(1),
    per_page: "2300",
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/cities?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllCitiesCatalog",
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
        message: "Error al obtener las ciudades",
        status: res.status,
        data,
      };
    }

    const normalizedCities = mapCitiesApiToEntities(data);

    return normalizedCities;
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

export { getCities };
