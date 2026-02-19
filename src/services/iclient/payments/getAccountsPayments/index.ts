import { enviroment } from "@config/enviroment";
import { IPayment } from "src/model/entity/payment";
import { mapAccountsPaymentsApiToEntities } from "./mappers";

const getAccountsPayments = async (
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
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllOtherDebtPayment",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(
      `${
        enviroment.ICLIENT_API_URL_QUERY
      }/other-debts/payment?${queryParams.toString()}`,
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

    const normalizedAccountsPayments = Array.isArray(data)
      ? mapAccountsPaymentsApiToEntities(
          data,
          withNextValueOption,
          withOtherValueOption,
          withExpiredValueOption,
          withTotalValueOption,
        )
      : [];

    return normalizedAccountsPayments;
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { getAccountsPayments };
