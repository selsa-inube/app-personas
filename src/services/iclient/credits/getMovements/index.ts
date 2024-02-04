import { enviroment } from "@config/enviroment";
import { IMovement } from "src/model/entity/product";
import { mapCreditMovementsApiToEntities } from "./mappers";

const getMovementsForCredit = async (
  creditId: string,
  accessToken: string,
): Promise<IMovement[]> => {
  try {
    const options = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchLastMovementsByObligationNumber",
        "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_QUERY}/portfolio-obligations/${creditId}/last-movement`,
      options,
    );

    if (res.status === 204) {
      return [];
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener los movimentos del crédito",
        status: res.status,
        data,
      };
    }

    return Array.isArray(data) ? mapCreditMovementsApiToEntities(data) : [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getMovementsForCredit };
