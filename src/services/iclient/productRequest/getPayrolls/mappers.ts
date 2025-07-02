import { IOption } from "@inubekit/inubekit";
import { capitalizeText } from "src/utils/texts";

const mapPayrollApiToEntity = (
  payroll: Record<string, string | number | object>,
): IOption => {
  return {
    id: String(payroll.payrollCode),
    value: String(payroll.payrollCode),
    label: capitalizeText(payroll.payrollName.toString()),
  };
};

const mapPayrollsApiToEntities = (
  payrolls: Record<string, string | number | object>[],
): IOption[] => {
  return payrolls.map((payroll) => mapPayrollApiToEntity(payroll));
};

export { mapPayrollApiToEntity, mapPayrollsApiToEntities };
