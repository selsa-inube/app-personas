import { enviroment } from "@config/enviroment";
import {
  mapModifyActionCdatApiToEntity,
  mapModifyActionCdatEntityToApi,
} from "./mappers";
import { IModifyActionCdatRequest, IModifyActionCdatResponse } from "./types";

const modifyActionCdat = async (
  modifyActionCdatRequest: IModifyActionCdatRequest,
  accessToken: string,
): Promise<IModifyActionCdatResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "StartCDATRequest",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(
        mapModifyActionCdatEntityToApi(modifyActionCdatRequest),
      ),
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
        message:
          "Error al realizar la modificación de la accion al vencimiento del cdat",
        status: res.status,
        data,
      };
    }

    return mapModifyActionCdatApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { modifyActionCdat };
