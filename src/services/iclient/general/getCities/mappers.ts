import { IOption } from "@inubekit/inubekit";
import { capitalizeText } from "src/utils/texts";
import { mapCreditApiToEntity } from "../../credits/getCredits/mappers";

const mapCityApiToEntity = (
  city: Record<string, string | number | object>,
): IOption => {
  return {
    id: city.cityId.toString(),
    value: city.publicCode.toString(),
    label: city.abbreviatedName
      ? capitalizeText(city.abbreviatedName.toString())
      : "",
  };
};

const mapCitiesApiToEntities = (
  cities: Record<string, string | number | object>[],
): IOption[] => {
  return cities
    .map((city) => mapCityApiToEntity(city))
    .filter((city, index, self) => {
      const publicCode = city.value;
      return index === self.findIndex((d) => d.value === publicCode);
    })
    .sort((a, b) => a.label.localeCompare(b.label));
};

export { mapCitiesApiToEntities, mapCreditApiToEntity };
