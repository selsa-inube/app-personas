import { enviroment } from "@config/enviroment";
import {
  mapRequestRegisterInEventApiToEntity,
  mapRequestRegisterInEventEntityToApi,
} from "./mappers";
import { IRegisterInEventRequest, IRegisterInEventResponse } from "./types";

const registerInEventRequest = async (
  registerInEvent: IRegisterInEventRequest,
  accessToken: string,
): Promise<IRegisterInEventResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "AddProductRequest",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(
        mapRequestRegisterInEventEntityToApi(registerInEvent),
      ),
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
        message: "Error al realizar la solicitud de inscripción al evento",
        status: res.status,
        data,
      };
    }

    return mapRequestRegisterInEventApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { registerInEventRequest };
