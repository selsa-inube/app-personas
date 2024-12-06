import { enviroment } from "@config/enviroment";
import { IServiceDomains } from "src/context/app/types";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapDomainsApiToEntities } from "./mappers";

const getDomains = async (
  domainNames: string[],
  accessToken: string,
): Promise<IServiceDomains | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    "enum-list": domainNames.join(","),
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/enumerators?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "GetAllEnums",
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
        message: "Error al obtener los dominios",
        status: res.status,
        data,
      };
    }

    const normalizedDomains = mapDomainsApiToEntities(data);

    return normalizedDomains;
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

export { getDomains };
