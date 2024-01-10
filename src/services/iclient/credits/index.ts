import { enviroment } from "@config/enviroment";
import { TEMP_BUSINESS_UNIT } from "src/App";
import { IAmortization, IMovement, IProduct } from "src/model/entity/product";
import {
  mapCreditAmortizationApiToEntities,
  mapCreditMovementsApiToEntities,
  mapCreditsApiToEntities,
} from "./mappers";

const getCreditsForUser = async (
  userIdentification: string,
  accessToken: string
): Promise<IProduct[]> => {
  try {
    const queryParams = new URLSearchParams({
      customerPublicCode: userIdentification,
    });

    const options = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
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
  creditId: string,
  accessToken: string
): Promise<IMovement[]> => {
  try {
    const options = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
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

const getAmortizationForCredit = async (
  creditId: string,
  accessToken: string
): Promise<IAmortization[]> => {
  try {
    const options = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchPaymentPlanByObligationNumber",
        "X-Business-Unit": TEMP_BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_QUERY}/portfolio-obligations/${creditId}/payment-plan`,
      options
    );

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener la amortización del crédito",
        status: res.status,
        data,
      };
    }

    return Array.isArray(data) ? mapCreditAmortizationApiToEntities(data) : [];
  } catch (error: any) {
    console.error(error.message, error);
    throw new Error(error.message);
  }
};

export { getAmortizationForCredit, getCreditsForUser, getMovementsForCredit };
