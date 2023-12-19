import { TEMP_BUSINESS_UNIT } from "src/App";
import { IProduct } from "src/model/entity/product";
import { ICLIENT_API_BASE_URL_QUERY } from "../api";
import { mapCreditsApiToEntities } from "./mappers";

const getCreditsForUser = async (
  userIdentification: string
): Promise<IProduct[]> => {
  const queryParams = new URLSearchParams();

  queryParams.append("customerPublicCode", userIdentification);

  const options = {
    method: "GET",
    headers: {
      "X-Action": "SearchAllPortfolioObligation",
      "X-Business-Unit": TEMP_BUSINESS_UNIT,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const res = await fetch(
    `${ICLIENT_API_BASE_URL_QUERY}/portfolio-obligations?${queryParams.toString()}`,
    options
  );

  const data = await res.json();

  if (Array.isArray(data)) {
    return mapCreditsApiToEntities(data);
  }

  return Promise.resolve([]);
};

export { getCreditsForUser };
