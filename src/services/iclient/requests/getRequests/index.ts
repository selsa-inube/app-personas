import { enviroment } from "@config/enviroment";
import { IRequest } from "src/model/entity/request";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapRequestsApiToEntities } from "./mappers";

const getRequestsForUser = async (
  userIdentification: string,
  accessToken: string,
  page: number,
  limit: number,
): Promise<IRequest[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    clientCode: userIdentification,
    page: String(page),
    per_page: String(limit),
    sort: "desc.requestDate",
    requestType: "nlk.registerinevent",
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/manage-product-request/product-request?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllProductRequests",
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
        message: "Error al obtener el historial de solicitudes",
        status: res.status,
        data,
      };
    }

    const normalizedResponse = Array.isArray(data)
      ? mapRequestsApiToEntities(data)
      : [];

    return normalizedResponse;
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

export { getRequestsForUser };
