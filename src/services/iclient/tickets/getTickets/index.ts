import { enviroment } from "@config/enviroment";
import { ITicket } from "src/model/entity/ticket";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapTicketsApiToEntities } from "./mappers";

const getTicketsForUser = async (
  userIdentification: string,
  accessToken: string,
): Promise<ITicket[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    customerCode: userIdentification,
    type: "Ticket",
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/events?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
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
        message: "Error al obtener la boleteria del usuario",
        status: res.status,
        data,
      };
    }

    const normalizedTickets = Array.isArray(data.events)
      ? mapTicketsApiToEntities(data.events)
      : [];

    return normalizedTickets;
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

export { getTicketsForUser };
