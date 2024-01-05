import { enviroment } from "@config/enviroment";
import { TEMP_BUSINESS_UNIT } from "src/App";
import { IMovement, IProduct } from "src/model/entity/product";
import {
  mapCreditMovementsApiToEntities,
  mapCreditsApiToEntities,
} from "./mappers";

const getCreditsForUser = async (
  userIdentification: string
): Promise<IProduct[]> => {
  try {
    const queryParams = new URLSearchParams({
      customerPublicCode: userIdentification,
    });

    const options = {
      method: "GET",
      headers: {
        "X-Action": "SearchAllPortfolioObligation",
        "X-Business-Unit": TEMP_BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(
      `${
        enviroment.ICLIENT_API_URL_QUERY
      }/portfolio-obligations?${queryParams.toString()}`,
      options
    );

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener los créditos del usuario",
        status: res.status,
        data,
      };
    }

    return Array.isArray(data) ? mapCreditsApiToEntities(data) : [];
  } catch (error: any) {
    console.error(error.message, error);
    throw new Error(error.message);
  }
};

const getMovementsForCredit = async (
  creditId: string
): Promise<IMovement[]> => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-Action": "SearchLastMovementsByObligationNumber",
        "X-Business-Unit": TEMP_BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_QUERY}/portfolio-obligations/${creditId}/last-movement`,
      options
    );

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener los movimentos del crédito",
        status: res.status,
        data,
      };
    }

    return Array.isArray(data) ? mapCreditMovementsApiToEntities(data) : [];
  } catch (error: any) {
    console.error(error.message, error);
    throw new Error(error.message);
  }
};

export { getCreditsForUser, getMovementsForCredit };
