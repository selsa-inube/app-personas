import { enviroment } from "@config/enviroment";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import {
  mapPaymentRequestApiToEntity,
  mapPaymentRequestEntityToApi,
} from "./mappers";
import { IPaymentRequest, IPaymentRequestResponse } from "./types";

const createPaymentRequest = async (
  paymentRequest: IPaymentRequest,
  accessToken: string,
): Promise<IPaymentRequestResponse | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_PERSISTENCE}/payments/manage-payment`;

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "ManagePayment",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapPaymentRequestEntityToApi(paymentRequest)),
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
        message: "Error al crear la solicitud de pago",
        status: res.status,
        data,
      };
    }

    return mapPaymentRequestApiToEntity(data);
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

export { createPaymentRequest };
