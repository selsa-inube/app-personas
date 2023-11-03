import { IServerDomain } from "@ptypes/domain.types";
import { accountTypeData } from "./accountType";
import { assetTypeData } from "./assetType";
import { bankData } from "./bank";
import { bankForeignData } from "./bankForeign";
import { creditDestinationData } from "./creditDestination";
import { creditProductTypeData } from "./creditProductType";
import { currencyData } from "./currency";
import { disbursementTypeData } from "./disbursementType";
import { liabilityTypeData } from "./liabilityType";
import { referenceTypeData } from "./referenceType";
import { suppliersTypeData } from "./suppliersType";

const domains: Record<string, IServerDomain[]> = {
  assetType: assetTypeData,
  liabilityType: liabilityTypeData,
  referenceType: referenceTypeData,
  accountType: accountTypeData,
  bank: bankData,
  creditDestination: creditDestinationData,
  creditProductType: creditProductTypeData,
  disbursementType: disbursementTypeData,
  currency: currencyData,
  bankForeign: bankForeignData,
  suppliersType: suppliersTypeData,
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
