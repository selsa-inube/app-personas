import { enviroment } from "@config/enviroment";
import { mapRequestAidApiToEntity, mapRequestAidEntityToApi } from "./mappers";
import { IRequestAidRequest, IRequestAidResponse } from "./types";

const createAidRequest = async (
  aidRequest: IRequestAidRequest,
  accessToken: string,
): Promise<IRequestAidResponse | undefined> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Realm: enviroment.AUTH_REALM,
        Authorization: `Bearer ${accessToken}`,
        "X-Action": "AddProductRequest",
        "X-Business-Unit": enviroment.BUSINESS_UNIT,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(mapRequestAidEntityToApi(aidRequest)),
    };

    const res = await fetch(
      `${enviroment.ICLIENT_API_URL_PERSISTENCE}/product-requests`,
      options,
    );

    if (res.status === 204) {
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        message: "Error al realizar la solicitud de auxilio",
        status: res.status,
        data,
      };
    }

    return mapRequestAidApiToEntity(data);
  } catch (error) {
    console.info(error);

    throw error;
  }
};

export { createAidRequest };
