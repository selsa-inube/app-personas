import { enviroment } from "@config/enviroment";
import {
  mapModifyActionProgrammedSavingApiToEntity,
  mapModifyActionProgrammedSavingEntityToApi,
} from "./mappers";
import {
  IModifyActionProgrammedSavingRequest,
  IModifyActionProgrammedSavingResponse,
} from "./types";

const modifyActionProgrammedSaving = async (
  modifyActionProgrammedSavingRequest: IModifyActionProgrammedSavingRequest,
  accessToken: string,
): Promise<IModifyActionProgrammedSavingResponse | undefined> => {
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
        mapModifyActionProgrammedSavingEntityToApi(
          modifyActionProgrammedSavingRequest,
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
          "Error al realizar la modificación de la accion al vencimiento del ahorro programado",
        status: res.status,
        data,
      };
    }

    return mapModifyActionProgrammedSavingApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { modifyActionProgrammedSaving };
