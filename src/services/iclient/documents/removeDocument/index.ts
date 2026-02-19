import { enviroment } from "@config/enviroment";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapRemoveDocumentEntityToApi } from "./mappers";
import { IRemoveDocumentRequest } from "./types";

const removeDocument = async (
  removeDocumentRequest: IRemoveDocumentRequest,
  accessToken: string,
) => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_PERSISTENCE}/document-management`;

  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "RemoveDocumentManagement",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapRemoveDocumentEntityToApi(removeDocumentRequest)),
    };

    const res = await fetch(requestUrl, options);

    saveNetworkTracking(
      requestTime,
      options.method || "DELETE",
      requestUrl,
      res.status,
      Math.round(performance.now() - startTime),
    );

    if (!res.ok) {
      const data = await res.json();

      throw {
        message: "Error al eliminar el documento",
        status: res.status,
        data,
      };
    }
  } catch (error) {
    saveNetworkTracking(
      requestTime,
      "DELETE",
      requestUrl,
      (error as { status?: number }).status || 500,
      Math.round(performance.now() - startTime),
    );

    console.info(error);

    throw error;
  }
};

export { removeDocument };
