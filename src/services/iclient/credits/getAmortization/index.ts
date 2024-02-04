import { enviroment } from "@config/enviroment";
import { IAmortization } from "src/model/entity/product";
import { mapCreditAmortizationApiToEntities } from "./mappers";

const getAmortizationForCredit = async (
  creditId: string,
  accessToken: string,
): Promise<IAmortization[]> => {
  try {
    const options = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchPaymentPlanByObligationNumber",
        "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_QUERY}/portfolio-obligations/${creditId}/payment-plan`,
      options,
    );

    if (res.status === 204) {
      return [];
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener la amortización del crédito",
        status: res.status,
        data,
      };
    }

    return Array.isArray(data) ? mapCreditAmortizationApiToEntities(data) : [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getAmortizationForCredit };
