import { enviroment } from "@config/enviroment";
import {
  mapSimulationEntityToApi,
  mapSimulationEntityToEntity,
} from "./mappers";
import { ISimulateCreditRequest, ISimulateCreditResponse } from "./types";

const simulateCreditConditions = async (
  simulationValues: ISimulateCreditRequest,
  accessToken: string,
): Promise<ISimulateCreditResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "CreditSimulation",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapSimulationEntityToApi(simulationValues)),
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_PERSISTENCE}/manage-product-request`,
      options,
    );
    console.log(res);
    if (res.status === 204) {
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al realizar la simulación",
        status: res.status,
        data,
      };
    }

    return mapSimulationEntityToEntity(data);
  } catch (error) {
    console.info("Error en la simulación:", error);
    throw error;
  }
};

export { simulateCreditConditions };
