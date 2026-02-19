import { enviroment } from "@config/enviroment";
import { IBeneficiary } from "src/model/entity/user";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapBeneficiariesApiToEntities } from "./mappers";

const getBeneficiariesForAid = async (
  aidId: string,
  userIdentification: string,
  accessToken: string,
): Promise<IBeneficiary[]> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/aid-products/${aidId}/customer/${userIdentification}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchBeneficiariesPerAid",
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
      return [];
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener los beneficiarios del auxilio del usuario.",
        status: res.status,
        data,
      };
    }

    const normalizedBeneficiaries = Array.isArray(data)
      ? mapBeneficiariesApiToEntities(data)
      : [];

    return normalizedBeneficiaries;
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

export { getBeneficiariesForAid };
