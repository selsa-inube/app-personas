import { enviroment } from "@config/enviroment";
import {
  mapSimulationEntityToApi,
  mapSimulationEntityToEntity,
} from "./mappers";
import {
  ISimulateCreditRequest,
  ISimulateCreditRequestResponse,
} from "./types";

const simulateCreditConditions = async (
  simulationValues: ISimulateCreditRequest,
  accessToken: string,
): Promise<ISimulateCreditRequestResponse | undefined> => {
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

    if (res.status === 204) {
      return;
    }

    if (!res.ok) {
      const data = await res.json();
      throw {
        message: "Error al realizar la simulación",
        status: res.status,
        data,
      };
    }

    const data = await res.json();
    return mapSimulationEntityToEntity(data);
  } catch (error) {
    console.info("Error en la simulación:", error);
    throw error;
  }
};

export { simulateCreditConditions };
