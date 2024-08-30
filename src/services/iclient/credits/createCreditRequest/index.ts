import { enviroment } from "@config/enviroment";
import {
  mapRequestCreditApiToEntity,
  mapRequestCreditEntityToApi,
} from "./mappers";
import { IRequestCreditRequest, IRequestCreditResponse } from "./types";

const createCreditRequest = async (
  creditRequest: IRequestCreditRequest,
  accessToken: string,
): Promise<IRequestCreditResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "AddProductRequest",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapRequestCreditEntityToApi(creditRequest)),
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_PERSISTENCE}/product-requests`,
      options,
    );

    if (res.status === 204) {
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al realizar la simulación",
        status: res.status,
        data,
      };
    }

    return mapRequestCreditApiToEntity(data);
  } catch (error) {
    console.info("Error en la simulación:", error);
    throw error;
  }
};

export { createCreditRequest };
