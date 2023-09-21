import { cityDM } from "src/model/domains/personalInformation/citydm";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { maritalStatusDM } from "src/model/domains/personalInformation/maritalstatusdm";
import { ISelectOption } from "@design/input/Select/types";

const domains: Record<string, ISelectOption[]> = {
  city: cityDM.options,
  gender: genderDM.options,
  maritalStatus: maritalStatusDM.options,
};

function getDomainById(domainName: string): ISelectOption[] {
  return domains[domainName];
}

function getDomainsByIds(domainNames: string[]): ISelectOption[][] {
  return domainNames.map((name) => getDomainById(name));
}

export { getDomainById, getDomainsByIds };
