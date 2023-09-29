import { ISelectOption } from "@design/input/Select/types";
import { liabilityTypeData } from "./liabilityType";
import { assetTypeData } from "./assetType";

const domains: Record<string, ISelectOption[]> = {
  assetType: assetTypeData,
  liabilityType: liabilityTypeData,
};

function getDomainById(domainId: string) {
  return domains[domainId];
}

function getDomainsByIds(domainIds: string[]) {
  const domainValues: Record<string, ISelectOption[]> = {};
  domainIds.forEach((id) => {
    domainValues[id] = getDomainById(id);
  });
  return domainValues;
}

function getValueOfDomain(id: string, domainId: string) {
  return getDomainById(domainId).find((domain) => domain.id === id);
}

export { getDomainById, getDomainsByIds, getValueOfDomain };
