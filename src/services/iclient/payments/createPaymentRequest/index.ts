import { enviroment } from "@config/enviroment";
import {
  IPaymentRequest,
  IPaymentRequestResponse,
} from "src/model/entity/payment";
import {
  mapPaymentRequestApiToEntity,
  mapPaymentRequestEntityToApi,
} from "./mappers";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";

const createPaymentRequest = async (
  paymentRequest: IPaymentRequest,
  accessToken: string,
): Promise<IPaymentRequestResponse | undefined> => {
  const requestUrl = `${enviroment.ICLIENT_API_URL_PERSISTENCE}/payments/manage-payment`;

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

  const startTime = performance.now();
  const requestTime = new Date();
  let responseTimeMs;
  let responseStatusCode;

  const trackNetworkRequest = async (
    requestTime: Date,
    responseStatusCode: number,
    responseTimeMs: number,
  ) => {
    if (enviroment.IS_PRODUCTION) {
      await saveNetworkTracking(
        requestTime,
        options.method || "POST",
        requestUrl,
        responseStatusCode,
        responseTimeMs,
      );
    }
  };

  try {
    const res = await fetch(requestUrl, options);

    responseTimeMs = Math.round(performance.now() - startTime);
    responseStatusCode = res.status;

    await trackNetworkRequest(requestTime, responseStatusCode, responseTimeMs);

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
    await trackNetworkRequest(
      requestTime,
      (responseStatusCode = 400),
      (responseTimeMs = Math.round(performance.now() - startTime)),
    );
    console.info(error);
    throw error;
  }
};

export { createPaymentRequest };
