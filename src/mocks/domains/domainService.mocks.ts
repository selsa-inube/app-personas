import { IServerDomain } from "@ptypes/domain.types";
import { accountTypeData } from "./accountType";
import { assetTypeData } from "./assetType";
import { bankData } from "./bank";
import { creditDestinationData } from "./creditDestination";
import { creditProductTypeData } from "./creditProductType";
import { liabilityTypeData } from "./liabilityType";
import { referenceTypeData } from "./referenceType";

const domains: Record<string, IServerDomain[]> = {
  assetType: assetTypeData,
  liabilityType: liabilityTypeData,
  referenceType: referenceTypeData,
  accountType: accountTypeData,
  bank: bankData,
  creditDestination: creditDestinationData,
  creditProductType: creditProductTypeData,
};

function getDomainById(domainId: string) {
  return domains[domainId];
}

function getDomainsByIds(domainIds: string[]) {
  const domainValues: Record<string, IServerDomain[]> = {};
  domainIds.forEach((id) => {
    domainValues[id] = getDomainById(id);
  });
  return domainValues;
}

function getValueOfDomain(id: string, domainId: string) {
  return getDomainById(domainId).find((domain) => domain.id === id);
}

export { getDomainById, getDomainsByIds, getValueOfDomain };
