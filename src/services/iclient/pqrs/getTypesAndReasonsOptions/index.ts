import { enviroment } from "@config/enviroment";
import { IOption } from "@inubekit/inubekit";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapTypesAndReasonsApiToEntities } from "./mappers";

const getTypesAndReasonsOptions = async (
  accessToken: string,
): Promise<{
  typeOptions: IOption[];
  reasonsByType: Record<string, IOption[]>;
}> => {
  const requestTime = new Date();
  const startTime = performance.now();
  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/pqrs`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchPQRSTypes",
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
      return { typeOptions: [], reasonsByType: {} };
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener los tipos y motivos de la solicitud pqrs.",
        status: res.status,
        data,
      };
    }

    return mapTypesAndReasonsApiToEntities(data);
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

export { getTypesAndReasonsOptions };
