import { enviroment } from "@config/enviroment";
import { mapConditionsApiToEntity, mapConditionsEntityToApi } from "./mappers";
import {
  ICalculatedProgramedSavingConditionsRequest,
  ICalculatedProgramedSavingConditionsResponse,
} from "./types";

const getCalculatedProgramedSavingConditions = async (
  conditions: ICalculatedProgramedSavingConditionsRequest,
  accessToken: string,
): Promise<ICalculatedProgramedSavingConditionsResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "CalculateConditionsProgrammedSaving",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapConditionsEntityToApi(conditions)),
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_PERSISTENCE}/manage-product-request`,
      options,
    );

    const data = await res.json();

    if (res.status === 204) {
      return;
    }

    if (!res.ok) {
      throw {
        message: "Error al calcular las condiciones del producto.",
        status: res.status,
        data,
      };
    }

    return mapConditionsApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { getCalculatedProgramedSavingConditions };
