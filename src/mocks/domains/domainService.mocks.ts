import { cityData } from "./city";
import { genderData } from "./gender";
import { maritalStatusData } from "./maritalstatus";
import { ISelectOption } from "@design/input/Select/types";

const domains: Record<string, ISelectOption[]> = {
  city: cityData,
  gender: genderData,
  maritalStatus: maritalStatusData,
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
