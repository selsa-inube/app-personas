import { enviroment } from "@config/enviroment";
import {
  mapModifyQuotaProgrammedSavingApiToEntity,
  mapModifyQuotaProgrammedSavingEntityToApi,
} from "./mappers";
import {
  IModifyQuotaProgrammedSavingRequest,
  IModifyQuotaProgrammedSavingResponse,
} from "./types";

const modifyQuotaProgrammedSaving = async (
  modifyQuotaProgrammedSavingRequest: IModifyQuotaProgrammedSavingRequest,
  accessToken: string,
): Promise<IModifyQuotaProgrammedSavingResponse | undefined> => {
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
        mapModifyQuotaProgrammedSavingEntityToApi(
          modifyQuotaProgrammedSavingRequest,
        ),
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
        message:
          "Error al realizar la modificación de la cuota del ahorro programado",
        status: res.status,
        data,
      };
    }

    return mapModifyQuotaProgrammedSavingApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { modifyQuotaProgrammedSaving };
