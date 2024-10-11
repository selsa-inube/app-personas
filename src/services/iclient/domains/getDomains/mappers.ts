import { ISelectOption } from "@design/input/Select/types";
import { IServiceDomains } from "src/context/app/types";
import { mapCreditApiToEntity } from "../../credits/getCredits/mappers";

const mapDomainApiToEntity = (
  domain: Record<string, string | number>,
): ISelectOption => {
  return {
    id: domain.code.toString(),
    value: domain.value.toString(),
  };
};

const mapDomainsApiToEntities = (
  domains: Record<string, Array<Record<string, string | number>>>,
): IServiceDomains => {
  const mappedDomains: Partial<IServiceDomains> = {};

  Object.keys(domains).forEach((domain) => {
    mappedDomains[domain as keyof IServiceDomains] =
      domains[domain].map(mapDomainApiToEntity);
  });

  return mappedDomains as IServiceDomains;
};

export { mapCreditApiToEntity, mapDomainsApiToEntities };
