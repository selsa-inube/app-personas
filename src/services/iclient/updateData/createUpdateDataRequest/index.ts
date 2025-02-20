import { enviroment } from "@config/enviroment";
import {
  mapRequestUpdateDataApiToEntity,
  mapRequestUpdateDataEntityToApi,
} from "./mappers";
import { IUpdateDataRequest, IUpdateDataResponse } from "./types";

const createUpdateDataRequest = async (
  programmedSavingRequest: IUpdateDataRequest,
  accessToken: string,
): Promise<IUpdateDataResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "UpdateDataRequest",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(
        mapRequestUpdateDataEntityToApi(programmedSavingRequest),
      ),
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_PERSISTENCE}/update-data`,
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
