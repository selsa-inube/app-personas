import { enviroment } from "@config/enviroment";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import {
  mapSaveDocumentApiToEntity,
  mapSaveDocumentEntityToApi,
} from "./mappers";
import { ISaveDocumentRequest, ISaveDocumentResponse } from "./types";

const saveDocument = async (
  saveDocumentRequest: ISaveDocumentRequest,
  accessToken: string,
): Promise<ISaveDocumentResponse | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_PERSISTENCE}/document-management`;

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SaveDocumentManagement",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        Accept: "*/*",
      },
      body: mapSaveDocumentEntityToApi(saveDocumentRequest),
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
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al guardar el documento",
        status: res.status,
        data,
      };
    }

    return mapSaveDocumentApiToEntity(data);
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

export { saveDocument };
