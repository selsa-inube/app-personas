import { enviroment } from "@config/enviroment";
import {
  mapRequestUpdateDataApiToEntity,
  mapRequestUpdateDataEntityToApi,
} from "./mappers";
import { IUpdateDataRequest, IUpdateDataResponse } from "./types";

const createUpdateDataRequest = async (
  updateDataRequest: IUpdateDataRequest,
  accessToken: string,
): Promise<IUpdateDataResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "AddProductRequest",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapRequestUpdateDataEntityToApi(updateDataRequest)),
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
        message: "Error al realizar la actualización de datos",
        status: res.status,
        data,
      };
    }

    return mapRequestUpdateDataApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { createUpdateDataRequest };
