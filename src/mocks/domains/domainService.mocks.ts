import { cityDM } from "src/model/domains/personalInformation/citydm";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { maritalStatusDM } from "src/model/domains/personalInformation/maritalstatusdm";
import { ISelectOption } from "@design/input/Select/types";

const domains: Record<string, ISelectOption[]> = {
  city: cityDM.options,
  gender: genderDM.options,
  maritalStatus: maritalStatusDM.options,
};

function getDomainById(domainId: string): ISelectOption[] {
  return domains[domainId];
}

function getDomainsByIds(domainIds: string[]): ISelectOption[][] {
  return domainIds.map((id) => getDomainById(id));
}

export { getDomainById, getDomainsByIds };
