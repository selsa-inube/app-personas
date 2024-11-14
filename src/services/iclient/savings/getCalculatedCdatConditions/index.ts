import { enviroment } from "@config/enviroment";
import { mapConditionsApiToEntity, mapConditionsEntityToApi } from "./mappers";
import {
  ICalculatedCdatConditionsRequest,
  ICalculatedCdatConditionsResponse,
} from "./types";

const getCalculatedCdatConditions = async (
  conditions: ICalculatedCdatConditionsRequest,
  accessToken: string,
): Promise<ICalculatedCdatConditionsResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SimulateConditionsCDAT",
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

export { getCalculatedCdatConditions };
