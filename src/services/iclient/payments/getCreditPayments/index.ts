import { enviroment } from "@config/enviroment";
import { IPayment } from "src/model/entity/payment";
import { mapCreditPaymentsApiToEntities } from "./mappers";

const getCreditPayments = async (
  userIdentification: string,
  accessToken: string,
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
  withTotalValueOption: boolean,
): Promise<IPayment[]> => {
  const maxRetries = 5;
  const fetchTimeout = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
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
          "X-Action": "SearchAllPortfolioObligationPayment",
          "X-Business-Unit": enviroment.BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${
          enviroment.ICLIENT_API_URL_QUERY
        }/portfolio-obligations/payment?${queryParams.toString()}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      if (!res.ok) {
        throw {
          message: "Error al obtener los pagos de obligaciones.",
          status: res.status,
        };
      }

      const data = await res.json();

      const normalizedCreditPayments = Array.isArray(data)
        ? mapCreditPaymentsApiToEntities(
            data,
            withNextValueOption,
            withOtherValueOption,
            withExpiredValueOption,
            withTotalValueOption,
          )
        : [];

      return normalizedCreditPayments;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener los pagos de obligaciones.",
        );
      }
    }
  }

  return [];
};

export { getCreditPayments };
