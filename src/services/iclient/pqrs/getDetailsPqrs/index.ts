import { enviroment } from "@config/enviroment";
import { IPQRS } from "src/model/entity/pqrs";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapPqrsDetailsApiToEntity } from "./mappers";

const getDetailsPqrs = async (
  userIdentification: string,
  accessToken: string,
  pqrsId: string,
): Promise<IPQRS | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    clientCode: userIdentification,
    pqrsId: pqrsId,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/pqrs?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllPQRS",
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

    if (!res.ok) {
      throw new Error("Error al obtener el historial de pqrs.");
    }

    const data = await res.json();

    return Array.isArray(data) && data.length > 0
      ? mapPqrsDetailsApiToEntity(data[0])
      : undefined;
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

export { getDetailsPqrs };
