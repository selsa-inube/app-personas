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
  const maxRetries = 5;
  const fetchTimeout = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const savedCredits = sessionStorage.getItem("credits");
      if (savedCredits) {
        const parsedCredits: IProduct[] = JSON.parse(savedCredits);
        return parsedCredits;
      }

      const queryParams = new URLSearchParams({
        customerPublicCode: userIdentification,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          Realm: enviroment.REALM,
          Authorization: `Bearer ${accessToken}`,
          "X-Action": "SearchAllPortfolioObligation",
          "X-Business-Unit": TEMP_BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${
          enviroment.ICLIENT_API_URL_QUERY
        }/portfolio-obligations?${queryParams.toString()}`,
        options
      );

      clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los créditos del usuario",
          status: res.status,
          data,
        };
      }

      const normalizedCredits = Array.isArray(data)
        ? mapCreditsApiToEntities(data)
        : [];

      sessionStorage.setItem("credits", JSON.stringify(normalizedCredits));

      return normalizedCredits;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los créditos del usuario."
        );
      }
    }
  }

  return [];
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
