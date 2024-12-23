import { enviroment } from "@config/enviroment";
import {
  mapCancelProgrammedSavingApiToEntity,
  mapCancelProgrammedSavingEntityToApi,
} from "./mappers";
import {
  ICancelProgrammedSavingRequest,
  ICancelProgrammedSavingResponse,
} from "./types";

const cancelProgrammedSaving = async (
  cancelProgrammedSavingRequest: ICancelProgrammedSavingRequest,
  accessToken: string,
): Promise<ICancelProgrammedSavingResponse | undefined> => {
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
      body: JSON.stringify(
        mapCancelProgrammedSavingEntityToApi(cancelProgrammedSavingRequest),
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
        message: "Error al realizar la cancelación de ahorro programado",
        status: res.status,
        data,
      };
    }

    return mapCancelProgrammedSavingApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { cancelProgrammedSaving };
