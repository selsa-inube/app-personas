import { IServerDomain } from "@ptypes/domain.types";
import { accountTypeData } from "./accountType";
import { assetTypeData } from "./assetType";
import { bankData } from "./bank";
import { bankForeignData } from "./bankForeign";
import { companiesData } from "./companies";
import { creditDestinationData } from "./creditDestination";
import { creditProductTypeData } from "./creditProductType";
import { currencyData } from "./currency";
import { dependenceData } from "./dependence";
import { disbursementTypeData } from "./disbursementType";
import { economicSectorData } from "./economicSector";
import { liabilityTypeData } from "./liabilityType";
import { paymentMethodData } from "./paymentMethodData";
import { positionData } from "./position";
import { professionData } from "./profession";
import { referenceTypeData } from "./referenceType";
import { refundMethodData } from "./refundMethod";
import { suppliersTypeData } from "./suppliersType";
import { accountDebitTypeData } from "./accountDebitType";

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
  companies: companiesData,
  dependence: dependenceData,
  economicSector: economicSectorData,
  position: positionData,
  profession: professionData,
  refundMethod: refundMethodData,
  paymentMethod: paymentMethodData,
  accountDebitType: accountDebitTypeData,
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
