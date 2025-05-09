import { enviroment } from "@config/enviroment";
import { IEvent } from "src/model/entity/event";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapEventsApiToEntities } from "./mappers";

const getEventsForUser = async (
  userIdentification: string,
  accessToken: string,
): Promise<IEvent[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    customerCode: userIdentification,
    type: "Event",
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/events?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAvailableEvents",
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
        message: "Error al obtener los eventos del usuario",
        status: res.status,
        data,
      };
    }

    const normalizedEvents = Array.isArray(data.events)
      ? mapEventsApiToEntities(data.events)
      : [];

    return normalizedEvents;
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

export { getEventsForUser };
