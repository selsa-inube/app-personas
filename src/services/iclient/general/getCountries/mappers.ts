import { IOption } from "@inubekit/inubekit";
import { capitalizeText } from "src/utils/texts";
import { mapCreditApiToEntity } from "../../credits/getCredits/mappers";

const mapCountryApiToEntity = (
  country: Record<string, string | number | object>,
): IOption => {
  return {
    id: country.publicCode.toString(),
    value: country.publicCode.toString(),
    label: country.abbreviatedName
      ? capitalizeText(country.abbreviatedName.toString())
      : "",
  };
};

const mapCountriesApiToEntities = (
  countries: Record<string, string | number | object>[],
): IOption[] => {
  return countries.map((country) => mapCountryApiToEntity(country));
};

export { mapCountriesApiToEntities, mapCreditApiToEntity };
