import { enviroment } from "@config/enviroment";
import { ISavingsState } from "src/context/savings/types";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapSavingsApiToEntities } from "./mappers";

const getSavingsForUser = async (
  userIdentification: string,
  accessToken: string,
): Promise<ISavingsState> => {
  const emptyResponse = {
    savingsAccounts: [],
    programmedSavings: [],
    savingsContributions: [],
    cdats: [],
    commitments: [],
  };
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    customerCode: userIdentification,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/saving-products?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllSavingProductCatalogs",
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
      return emptyResponse;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener los productos de ahorro del usuario",
        status: res.status,
        data,
      };
    }

    const normalizedSavings = Array.isArray(data)
      ? mapSavingsApiToEntities(data)
      : emptyResponse;

    return normalizedSavings;
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

export { getSavingsForUser };
