import { enviroment } from "@config/enviroment";
import {
  mapValidateOtherValueEntityToApi,
  mapValidateOtherValueEntityToEntity,
} from "./mappers";
import { IOtherValueRequest, IOtherValueResponse } from "./types";

const validateOtherValue = async (
  payment: IOtherValueRequest,
  accessToken: string,
): Promise<IOtherValueResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "ValidateOtherValuePayment",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapValidateOtherValueEntityToApi(payment)),
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_PERSISTENCE}/payments/manage-payment`,
      options,
    );

    const data = await res.json();

    if (res.status === 204) {
      return;
    }

    if (!res.ok) {
      throw {
        message: "Error al validar el otro valor a pagar",
        status: res.status,
        data,
      };
    }

    return mapValidateOtherValueEntityToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { validateOtherValue };
