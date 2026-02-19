import { enviroment } from "@config/enviroment";
import {
  mapRequestProgrammedSavingApiToEntity,
  mapRequestProgrammedSavingEntityToApi,
} from "./mappers";
import {
  IRequestProgrammedSavingRequest,
  IRequestProgrammedSavingResponse,
} from "./types";

const createProgrammedSavingRequest = async (
  programmedSavingRequest: IRequestProgrammedSavingRequest,
  accessToken: string,
): Promise<IRequestProgrammedSavingResponse | undefined> => {
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
        mapRequestProgrammedSavingEntityToApi(programmedSavingRequest),
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
        message: "Error al realizar la solicitud de ahorro programado",
        status: res.status,
        data,
      };
    }

    return mapRequestProgrammedSavingApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { createProgrammedSavingRequest };
