import { TEMP_BUSINESS_UNIT } from "src/App";
import { IProduct } from "src/model/entity/product";
import { ICLIENT_API_URL_QUERY } from "../api";
import { mapCreditsApiToEntities } from "./mappers";

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
      `${ICLIENT_API_URL_QUERY}/portfolio-obligations?${queryParams.toString()}`,
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
  } catch (error) {
    console.error("Error al obtener los créditos del usuario:", error);
    throw new Error("Error al obtener los créditos del usuario");
  }
};
export { getCreditsForUser };
