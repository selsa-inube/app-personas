import { enviroment } from "@config/enviroment";
import { ICommitment } from "src/model/entity/product";
import { mapSavingsApiToEntities } from "./mappers";
import { developmentUsersMock } from "@mocks/users/users.mocks";

const getSavingsCommitmentsForUser = async (
  userIdentification: string,
  accessToken: string,
): Promise<ICommitment[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;
  const emptyResponse: ICommitment[] = [];

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        customerCode:
          developmentUsersMock[userIdentification] || userIdentification,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          Realm: enviroment.REALM,
          Authorization: `Bearer ${accessToken}`,
          "X-Action": "SearchAllSavingPlan",
          "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${
          enviroment.ICLIENT_API_URL_QUERY
        }/saving-plans?${queryParams.toString()}`,
        options,
      );

      clearTimeout(timeoutId);

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
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los compromisos de ahorro del usuario.",
        );
      }
    }
  }

  return emptyResponse;
};

export { getSavingsCommitmentsForUser };
