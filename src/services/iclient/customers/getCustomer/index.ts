import { enviroment } from "@config/enviroment";
import { IThird } from "src/model/entity/user";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapCustomerApiToEntity } from "./mappers";

const getCustomer = async (
  userIdentification: string,
  accessToken: string,
): Promise<IThird | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    publicCode: userIdentification,
  });

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/customers?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllCustomerCatalog",
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
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener los datos de un usuario",
        status: res.status,
        data,
      };
    }

    const normalizedCustomers =
      Array.isArray(data) && data.length > 0
        ? mapCustomerApiToEntity(data[0])
        : undefined;

    return normalizedCustomers;
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

export { getCustomer };
