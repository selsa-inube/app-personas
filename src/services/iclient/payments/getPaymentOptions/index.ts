import { enviroment } from "@config/enviroment";
import {
  IPaymentOptionRequest,
  IPaymentOptionRequestResponse,
} from "src/model/entity/payment";
import {
  mapPaymentOptionsEntityToApi,
  mapPaymentOptionsEntityToEntity,
} from "./mappers";

const getPaymentOptions = async (
  payment: IPaymentOptionRequest,
  accessToken: string,
): Promise<IPaymentOptionRequestResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "DeductPaymentDestinationForFinancialPortfolio",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapPaymentOptionsEntityToApi(payment)),
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_PERSISTENCE}/payments/deduct_payment_destination_for_financial_portfolio`,
      options,
    );

    const data = await res.json();

    if (res.status === 204) {
      return;
    }

    if (!res.ok) {
      throw {
        message: "Error al obtener opciones de pago",
        status: res.status,
        data,
      };
    }

    return mapPaymentOptionsEntityToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { getPaymentOptions };
