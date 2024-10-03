import { enviroment } from "@config/enviroment";
import { ITransfer } from "src/model/entity/transfer";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapTransfersHistoryApiToEntities } from "./mappers";

const getTransferHistory = async (
  userIdentification: string,
  accessToken: string,
  page: number,
  limit: number,
): Promise<ITransfer[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    customerCode: userIdentification,
    page: String(page),
    per_page: String(limit),
    sort: "desc.transferDate",
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/transfer?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllTransfer",
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

    if (!res.ok) {
      throw {
        message: "Error al obtener el historial de transferencias del usuario.",
        status: res.status,
      };
    }

    const data = await res.json();

    const normalizedTransferHistory = Array.isArray(data)
      ? mapTransfersHistoryApiToEntities(data)
      : [];

    return normalizedTransferHistory;
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

export { getTransferHistory };
