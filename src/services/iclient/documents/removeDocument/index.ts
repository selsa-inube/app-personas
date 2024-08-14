import { enviroment } from "@config/enviroment";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import {
  mapRemoveDocumentApiToEntity,
  mapRemoveDocumentEntityToApi,
} from "./mappers";
import { IRemoveDocumentRequest, IRemoveDocumentResponse } from "./types";

const removeDocument = async (
  removeDocumentRequest: IRemoveDocumentRequest,
  accessToken: string,
): Promise<IRemoveDocumentResponse | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_PERSISTENCE}/document-management`;

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "RemoveDocumentManagement",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: mapRemoveDocumentEntityToApi(removeDocumentRequest),
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

    if (!res.ok) {
      throw {
        message: "Error al guardar el documento",
        status: res.status,
      };
    }

    const data = await res.json();

    return mapRemoveDocumentApiToEntity(data);
  } catch (error) {
    saveNetworkTracking(
      requestTime,
      "POST",
      requestUrl,
      (error as { status?: number }).status || 500,
      Math.round(performance.now() - startTime),
    );

    throw new Error("No se pudo guardar el documento");
  }
};

export { removeDocument };
