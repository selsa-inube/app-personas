import { enviroment } from "@config/enviroment";
import {
  IPaymentRequest,
  IPaymentRequestResponse,
} from "src/model/entity/payment";
import {
  mapPaymentRequestApiToEntity,
  mapPaymentRequestEntityToApi,
} from "./mappers";

const createPaymentRequest = async (
  paymentRequest: IPaymentRequest,
  accessToken: string,
): Promise<IPaymentRequestResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "ManagePayment",
        "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapPaymentRequestEntityToApi(paymentRequest)),
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_PERSISTENCE}/payments/manage-payment`,
      options,
    );

    if (res.status === 204) {
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al crear la solicitud de pago",
        status: res.status,
        data,
      };
    }

    return mapPaymentRequestApiToEntity(data);
  } catch (error) {
    console.info(error);

    return;
  }
};

export { createPaymentRequest };
