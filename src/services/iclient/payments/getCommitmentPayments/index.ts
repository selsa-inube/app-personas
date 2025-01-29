import { enviroment } from "@config/enviroment";
import { IPayment } from "src/model/entity/payment";
import { mapCommitmentPaymentsApiToEntities } from "./mappers";

const getCommitmentPayments = async (
  userIdentification: string,
  accessToken: string,
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
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
        "X-Action": "SearchAllSavingPlanPayment",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const res = await fetch(
      `${
        enviroment.ICLIENT_API_URL_QUERY
      }/saving-plans/payment?${queryParams.toString()}`,
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

    const normalizedCommitmentPayments = Array.isArray(data)
      ? mapCommitmentPaymentsApiToEntities(
          data,
          withNextValueOption,
          withOtherValueOption,
          withExpiredValueOption,
        )
      : [];

    return normalizedCommitmentPayments;
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { getCommitmentPayments };
