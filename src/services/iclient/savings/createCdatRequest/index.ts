import { enviroment } from "@config/enviroment";
import {
  mapRequestCdatApiToEntity,
  mapRequestCdatEntityToApi,
} from "./mappers";
import { IRequestCdatRequest, IRequestCdatResponse } from "./types";

const createCdatRequest = async (
  cdatRequest: IRequestCdatRequest,
  accessToken: string,
): Promise<IRequestCdatResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "ProcessCDATRequest",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapRequestCdatEntityToApi(cdatRequest)),
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_PERSISTENCE}/cdats`,
      options,
    );

    if (res.status === 204) {
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al realizar la solicitud de CDAT",
        status: res.status,
        data,
      };
    }

    return mapRequestCdatApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { createCdatRequest };
