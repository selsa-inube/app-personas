import { enviroment } from "@config/enviroment";
import { IEntryCategory } from "@pages/request/events/RegisterInEvent/forms/ChooseEntriesForm/types";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapEntriesApiToEntities, mapEntryEntityToApi } from "./mappers";
import { IGetEntriesCostRequest } from "./types";

const getEntriesCost = async (
  getEntriesCostRequest: IGetEntriesCostRequest,
  accessToken: string,
): Promise<IEntryCategory[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_PERSISTENCE}/manage-product-request`;

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "ObtainEntriesCategories",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapEntryEntityToApi(getEntriesCostRequest)),
    };

    const res = await fetch(requestUrl, options);

    saveNetworkTracking(
      requestTime,
      options.method || "POST",
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
      "POST",
      requestUrl,
      (error as { status?: number }).status || 500,
      Math.round(performance.now() - startTime),
    );

    console.info(error);

    throw error;
  }
};

export { getEntriesCost };
