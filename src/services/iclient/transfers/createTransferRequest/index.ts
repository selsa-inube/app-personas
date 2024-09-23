import { enviroment } from "@config/enviroment";
import {
  ITransferRequest,
  ITransferRequestResponse,
} from "src/model/entity/transfer";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import {
  mapTransferRequestApiToEntity,
  mapTransferRequestEntityToApi,
} from "./mappers";

const createTransferRequest = async (
  transferRequest: ITransferRequest,
  accessToken: string,
): Promise<ITransferRequestResponse | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_PERSISTENCE}/transfers/manage-transfer`;

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "ManageTransfer",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapTransferRequestEntityToApi(transferRequest)),
    };

    const res = await fetch(requestUrl, options);

    saveNetworkTracking(
      requestTime,
      options.method || "POST",
      requestUrl,
      res.status,
      Math.round(performance.now() - startTime),
    );

    const data = await res.json();

    if (res.status === 204) {
      return;
    }

    if (!res.ok) {
      throw {
        message: "Error al crear la solicitud de transferencia",
        status: res.status,
        data,
      };
    }

    return mapTransferRequestApiToEntity(data);
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

export { createTransferRequest };
