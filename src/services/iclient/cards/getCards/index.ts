import { enviroment } from "@config/enviroment";
import { IProduct } from "src/model/entity/product";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapCardsApiToEntities } from "./mappers";

const getCardsForUser = async (
  userIdentification: string,
  accessToken: string,
  savingAccounts: IProduct[],
): Promise<IProduct[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    customerCode: userIdentification,
  }).toString();

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/cards?${queryParams}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllCard",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(requestUrl, options);

    saveNetworkTracking(
      requestTime,
      options.method || "GET",
      requestUrl,
      res.status,
      Math.round(performance.now() - startTime),
    );

    if (res.status === 204) {
      return [];
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener las tarjetas del usuario",
        status: res.status,
        data,
      };
    }

    const normalizedCredits = Array.isArray(data)
      ? mapCardsApiToEntities(data, savingAccounts)
      : [];

    return normalizedCredits;
  } catch (error) {
    saveNetworkTracking(
      requestTime,
      "GET",
      requestUrl,
      (error as { status?: number }).status || 500,
      Math.round(performance.now() - startTime),
    );

    console.info(error);

    throw error;
  }
};

export { getCardsForUser };
