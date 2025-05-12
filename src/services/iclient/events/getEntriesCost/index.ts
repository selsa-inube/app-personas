import { enviroment } from "@config/enviroment";
import { entriesCategoriesMock } from "@mocks/events/entriesCategories.mocks";
import { IEntryCategory } from "@pages/request/events/RegisterInEvent/forms/ChooseEntriesForm/types";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapEntriesApiToEntities } from "./mappers";

const getEntriesCost = async (
  userIdentification: string,
  eventId: string,
  accessToken: string,
): Promise<IEntryCategory[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    customerCode: userIdentification,
    eventId,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/events?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "GetEntriesCost",
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
        message: "Error al obtener los costos de entradas",
        status: res.status,
        data,
      };
    }

    const normalizedEntries = Array.isArray(data.entriesCategories)
      ? mapEntriesApiToEntities(data.entriesCategories)
      : [];

    return normalizedEntries;
  } catch (error) {
    saveNetworkTracking(
      requestTime,
      "GET",
      requestUrl,
      (error as { status?: number }).status || 500,
      Math.round(performance.now() - startTime),
    );

    console.info(error);

    /* throw error; */
    return entriesCategoriesMock;
  }
};

export { getEntriesCost };
