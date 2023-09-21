import { cityData } from "./city";
import { genderData } from "./gender";
import { maritalStatusData } from "./maritalstatus";
import { ISelectOption } from "@design/input/Select/types";

const domains: Record<string, ISelectOption[]> = {
  city: cityData,
  gender: genderData,
  maritalStatus: maritalStatusData,
};

function getDomainById(domainId: string): ISelectOption[] {
  return domains[domainId];
}

function getDomainsByIds(domainIds: string[]): ISelectOption[][] {
  return domainIds.map((id) => getDomainById(id));
}

export { getDomainById, getDomainsByIds };
