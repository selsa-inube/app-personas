import { ISelectOption } from "@design/input/Select/types";
import { accountTypeData } from "./accountType";
import { assetTypeData } from "./assetType";
import { bankData } from "./bank";
import { creditDestinationData } from "./creditDestination";
import { liabilityTypeData } from "./liabilityType";
import { referenceTypeData } from "./referenceType";

const domains: Record<string, ISelectOption[]> = {
  assetType: assetTypeData,
  liabilityType: liabilityTypeData,
  referenceType: referenceTypeData,
  accountType: accountTypeData,
  bank: bankData,
  creditDestination: creditDestinationData,
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
