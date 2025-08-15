import { enviroment } from "@config/enviroment";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import {
  mapRequirementEntityToApi,
  mapRequirementsApiToEntities,
} from "./mappers";
import { IRequirementRequest, IRequirementResponse } from "./types";

const getRequirementsForProduct = async (
  requirementRequest: IRequirementRequest,
  accessToken: string,
): Promise<{
  success: boolean;
  requirements: IRequirementResponse | undefined;
}> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const requestUrl = `${enviroment.ICLIENT_API_URL_PERSISTENCE}/manage-product-request`;

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "RequirementList",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapRequirementEntityToApi(requirementRequest)),
    };

    const res = await fetch(requestUrl, options);

    saveNetworkTracking(
      requestTime,
      options.method || "POST",
      requestUrl,
      res.status,
      Math.round(performance.now() - startTime),
    );

    if (res.status === 204) {
      return { success: true, requirements: undefined };
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al obtener los requerimientos del producto.",
        status: res.status,
        data,
      };
    }

    return {
      success: true,
      requirements: mapRequirementsApiToEntities(data),
    };
  } catch (error) {
    saveNetworkTracking(
      requestTime,
      "POST",
      requestUrl,
      (error as { status?: number }).status || 500,
      Math.round(performance.now() - startTime),
    );

    console.info(error);

    throw error;
  }
};

export { getRequirementsForProduct };
