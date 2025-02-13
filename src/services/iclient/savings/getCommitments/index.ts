import { enviroment } from "@config/enviroment";
import { ICommitment } from "src/model/entity/product";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapSavingsApiToEntities } from "./mappers";

const getSavingsCommitmentsForUser = async (
  userIdentification: string,
  accessToken: string,
): Promise<ICommitment[]> => {
  const emptyResponse: ICommitment[] = [];
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    customerCode: userIdentification,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/saving-plans?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllSavingPlan",
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
        message: "Error al obtener los compromisos de ahorro del usuario",
        status: res.status,
        data,
      };
    }

    const normalizedSavingsCommitments = Array.isArray(data)
      ? mapSavingsApiToEntities(data)
      : emptyResponse;

    return normalizedSavingsCommitments;
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

export { getSavingsCommitmentsForUser };
