import { enviroment } from "@config/enviroment";
import { mapConditionsApiToEntity, mapConditionsEntityToApi } from "./mappers";
import {
  ICalculatedAidConditionsRequest,
  ICalculatedAidConditionsResponse,
} from "./types";

const getCalculatedAidConditions = async (
  conditions: ICalculatedAidConditionsRequest,
  accessToken: string,
): Promise<ICalculatedAidConditionsResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "CalculateAidConditions",
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

export { getCalculatedAidConditions };
