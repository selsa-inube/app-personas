import { IOption } from "@inubekit/inubekit";
import { IReasonPqrs, ITypePqrs } from "@pages/admin/pqrs/PQRSCreate/types";
import { capitalizeText } from "src/utils/texts";

const mapTypesAndReasonsApiToEntities = (
  data: ITypePqrs[],
): {
  typeOptions: IOption[];
  reasonsByType: Record<string, IOption[]>;
} => {
  if (!Array.isArray(data)) {
    return { typeOptions: [], reasonsByType: {} };
  }

  const typeOptions: IOption[] = data.map((type) => ({
    id: type.typeCode,
    value: type.typeCode,
    label: capitalizeText(type.alias?.trim() || type.typeName),
  }));

  const reasonsByType: Record<string, IOption[]> = data.reduce(
    (acc, type) => {
      acc[type.typeCode] = (type.reasons || []).map((reason: IReasonPqrs) => ({
        id: reason.reasonCode,
        value: reason.reasonCode,
        label: capitalizeText(reason.reasonName),
      }));
      return acc;
    },
    {} as Record<string, IOption[]>,
  );

  return { typeOptions, reasonsByType };
};

export { mapTypesAndReasonsApiToEntities };
