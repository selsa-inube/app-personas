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
  try {
    const queryParams = new URLSearchParams({
      customerCode: userIdentification,
    });

    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllPortfolioObligationPayment",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(
      `${
        enviroment.ICLIENT_API_URL_QUERY
      }/portfolio-obligations/payment?${queryParams.toString()}`,
      options,
    );

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
    console.info(error);

    throw error;
  }
};

export { getCreditPayments };
