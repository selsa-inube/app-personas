import { IOption } from "@inubekit/inubekit";
import { capitalizeText } from "src/utils/texts";
import { mapCreditApiToEntity } from "../../credits/getCredits/mappers";

const mapCurrencyApiToEntity = (
  currency: Record<string, string | number | object>,
): IOption => {
  return {
    id: currency.currencyId.toString(),
    value: currency.publicCode.toString(),
    label: currency.abbreviatedName
      ? `${capitalizeText(currency.abbreviatedName.toString())} (${currency.publicCode.toString()})`
      : "",
  };
};

const mapCurrenciesApiToEntities = (
  currencies: Record<string, string | number | object>[],
): IOption[] => {
  return currencies
    .map((currency) => mapCurrencyApiToEntity(currency))
    .filter((currency, index, self) => {
      const publicCode = currency.value;
      return index === self.findIndex((d) => d.value === publicCode);
    })
    .sort((a, b) => a.label.localeCompare(b.label));
};

export { mapCurrenciesApiToEntities, mapCreditApiToEntity };
