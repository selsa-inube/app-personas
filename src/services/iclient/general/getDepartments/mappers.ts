import { IOption } from "@inubekit/inubekit";
import { capitalizeText } from "src/utils/texts";
import { mapCreditApiToEntity } from "../../credits/getCredits/mappers";

const mapDepartmentApiToEntity = (
  department: Record<string, string | number | object>,
): IOption => {
  return {
    id: department.departmentId.toString(),
    value: department.publicCode.toString(),
    label: department.abbreviatedName
      ? capitalizeText(department.abbreviatedName.toString())
      : "",
  };
};

const mapDepartmentsApiToEntities = (
  departments: Record<string, string | number | object>[],
): IOption[] => {
  return departments.map((department) => mapDepartmentApiToEntity(department));
};

export { mapDepartmentsApiToEntities, mapCreditApiToEntity };
