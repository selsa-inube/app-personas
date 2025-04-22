import { enviroment } from "@config/enviroment";
import { IOption } from "@inubekit/inubekit";
import { saveNetworkTracking } from "src/services/analytics/saveNetworkTracking";
import { mapDepartmentsApiToEntities } from "./mappers";

const getDepartments = async (
  accessToken: string,
  countryId?: string,
): Promise<IOption[] | undefined> => {
  const requestTime = new Date();
  const startTime = performance.now();

  const queryParams = new URLSearchParams({
    page: String(1),
    per_page: "250",
  });

  if (countryId) {
    queryParams.append("countryId", countryId);
  }

  const requestUrl = `${enviroment.ICLIENT_API_URL_QUERY}/departments?${queryParams.toString()}`;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "SearchAllDepartmentsCatalog",
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
        message: "Error al obtener los departamentos",
        status: res.status,
        data,
      };
    }

    const normalizedDepartments = mapDepartmentsApiToEntities(data);

    return normalizedDepartments;
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

export { getDepartments };
