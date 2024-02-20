import { enviroment } from "@config/enviroment";
import { mapCommitmentsForProductApiToEntities } from "./mappers";

const getCommitmentsForProduct = async (
  productId: string,
  accessToken: string,
) => {
  const maxRetries = 5;
  const fetchTimeout = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        productNumber: productId,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          Realm: enviroment.REALM,
          Authorization: `Bearer ${accessToken}`,
          "X-Action": "SearchAllProductsCommitmentRelationship",
          "X-Business-Unit": enviroment.TEMP_BUSINESS_UNIT,
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${
          enviroment.ICLIENT_API_URL_QUERY
        }/saving-plans?${queryParams.toString()}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los compromisos del producto",
          status: res.status,
          data,
        };
      }

      const normalizedCommitmentsForProduct = Array.isArray(data)
        ? mapCommitmentsForProductApiToEntities(data)
        : [];

      return normalizedCommitmentsForProduct;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los compromisos del producto",
        );
      }
    }
  }

  return [];
};

export { getCommitmentsForProduct };
