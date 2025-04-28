import { IOption } from "@inubekit/inubekit";
import { capitalizeText } from "src/utils/texts";
import { mapCreditApiToEntity } from "../../credits/getCredits/mappers";

const mapCountryApiToEntity = (
  country: Record<string, string | number | object>,
): IOption => {
  return {
    id: country.countryId.toString(),
    value: country.publicCode.toString(),
    label: country.abbreviatedName
      ? capitalizeText(country.abbreviatedName.toString())
      : "",
  };
};

const mapCountriesApiToEntities = (
  countries: Record<string, string | number | object>[],
): IOption[] => {
  return countries
    .map((country) => mapCountryApiToEntity(country))
    .filter((country, index, self) => {
      const publicCode = country.value;
      return index === self.findIndex((d) => d.value === publicCode);
    })
    .sort((a, b) => a.label.localeCompare(b.label));
};

export { mapCountriesApiToEntities, mapCreditApiToEntity };
