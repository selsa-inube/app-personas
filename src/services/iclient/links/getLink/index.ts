import { enviroment } from "@config/enviroment";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapLinkApiToEntity } from "./mappers";

const getLink = async (
  accessToken: string,
  linkType: string,
): Promise<string | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/links/type-link/${linkType}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchLinkByType",
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
        message: "Error al obtener el link.",
        status: res.status,
        data,
      };
    }

    return mapLinkApiToEntity(data);
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

export { getLink };
