import { enviroment } from "@config/enviroment";
import {
  mapRequestPqrsApiToEntity,
  mapRequestPqrsEntityToApi,
} from "./mappers";
import { IRequestPqrs, IRequestPqrsResponse } from "./types";

const createPqrsRequest = async (
  pqrsRequest: IRequestPqrs,
  accessToken: string,
): Promise<IRequestPqrsResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "AddPQRSRequest",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapRequestPqrsEntityToApi(pqrsRequest)),
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_PERSISTENCE}/pqrs`,
      options,
    );

    if (res.status === 204) {
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al realizar la creación de la pqrs.",
        status: res.status,
        data,
      };
    }

    return mapRequestPqrsApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { createPqrsRequest };
