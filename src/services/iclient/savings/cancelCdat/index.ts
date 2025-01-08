import { enviroment } from "@config/enviroment";
import { mapCancelCdatApiToEntity, mapCancelCdatEntityToApi } from "./mappers";
import { ICancelCdatRequest, ICancelCdatResponse } from "./types";

const cancelCdat = async (
  cancelCdatRequest: ICancelCdatRequest,
  accessToken: string,
): Promise<ICancelCdatResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "StartCDATRequest",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapCancelCdatEntityToApi(cancelCdatRequest)),
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
        message: "Error al realizar la cancelación de cdat",
        status: res.status,
        data,
      };
    }

    return mapCancelCdatApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { cancelCdat };
