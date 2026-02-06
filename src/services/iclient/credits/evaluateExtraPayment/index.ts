import { enviroment } from "@config/enviroment";
import {
  mapExtraPaymentApiToEntity,
  mapExtraPaymentEntityToApi,
  noExtraPaymentResponse,
} from "./mappers";
import { IExtraPaymentRequest, IExtraPaymentResponse } from "./types";

const evaluateExtraPayment = async (
  conditions: IExtraPaymentRequest,
  accessToken: string,
): Promise<IExtraPaymentResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "EvaluateExtraPayment",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapExtraPaymentEntityToApi(conditions)),
    };
    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_PERSISTENCE}/manage-product-request`,
      options,
    );

    if (res.status === 204) {
      return noExtraPaymentResponse;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message:
          "Error al evaluar si es posible realizar cuotas extraordinarias.",
        status: res.status,
        data,
      };
    }

    return mapExtraPaymentApiToEntity(data);
  } catch (error) {
    console.info(error);

    return noExtraPaymentResponse;
  }
};

export { evaluateExtraPayment };
