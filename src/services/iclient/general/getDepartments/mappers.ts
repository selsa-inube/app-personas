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
  return departments
    .map((department) => mapDepartmentApiToEntity(department))
    .filter((department, index, self) => {
      const publicCode = department.value;
      return index === self.findIndex((d) => d.value === publicCode);
    })
    .sort((a, b) => a.label.localeCompare(b.label));
};

export { mapCreditApiToEntity, mapDepartmentsApiToEntities };
