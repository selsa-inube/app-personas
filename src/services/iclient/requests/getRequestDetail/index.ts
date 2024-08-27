import { enviroment } from "@config/enviroment";
import { IRequest } from "src/model/entity/request";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapRequestDetailApiToEntity } from "./mappers";

const getRequestDetail = async (
  requestId: string,
  accessToken: string,
): Promise<IRequest | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    requestId: requestId,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/request-detail?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchRequestDetail",
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
      throw {
        message: "Error al obtener el detalle de la solicitud.",
        status: res.status,
      };
    }

    const data = await res.json();

    return mapRequestDetailApiToEntity(data);
  } catch (error) {
    saveNetworkTracking(
      requestTime,
      "GET",
      requestUrl,
      (error as { status?: number }).status || 500,
      Math.round(performance.now() - startTime),
    );

    throw new Error("No se pudo obtener el detalle de la solicitud");
  }
};

export { getRequestDetail };
