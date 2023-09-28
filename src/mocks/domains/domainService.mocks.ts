import { ISelectOption } from "@design/input/Select/types";
import { assetData } from "./asset";
import { cityData } from "./city";
import { genderData } from "./gender";
import { liabilityData } from "./liability";
import { maritalStatusData } from "./maritalstatus";

const domains: Record<string, ISelectOption[]> = {
  city: cityData,
  gender: genderData,
  maritalStatus: maritalStatusData,
  asset: assetData,
  liability: liabilityData,
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

export { getDomainById, getDomainsByIds };
