import { enviroment } from "@config/enviroment";
import { IPayment } from "src/model/entity/payment";
import { mapCardPaymentsApiToEntities } from "./mappers";

const getCardPayments = async (
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
        "X-Action": "SearchAllCardProductsPayment",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(
      `${
        enviroment.ICLIENT_API_URL_QUERY
      }/credit-card-products/payment?${queryParams.toString()}`,
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

    const normalizedCardPayments = Array.isArray(data)
      ? mapCardPaymentsApiToEntities(
          data,
          withNextValueOption,
          withOtherValueOption,
          withExpiredValueOption,
          withTotalValueOption,
        )
      : [];

    return normalizedCardPayments;
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { getCardPayments };
