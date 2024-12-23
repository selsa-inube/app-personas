import { ISelectOption } from "@design/input/Select/types";
import { IReasonPqrs, ITypePqrs } from "@pages/admin/pqrs/PQRSCreate/types";
import { capitalizeText } from "src/utils/texts";

const mapTypesAndReasonsApiToEntities = (
  data: ITypePqrs[],
): {
  typeOptions: ISelectOption[];
  reasonsByType: Record<string, ISelectOption[]>;
} => {
  if (!Array.isArray(data)) {
    return { typeOptions: [], reasonsByType: {} };
  }

  const typeOptions: ISelectOption[] = data.map((type) => ({
    id: type.typeCode,
    value: capitalizeText(type.typeName),
  }));

  const reasonsByType: Record<string, ISelectOption[]> = data.reduce(
    (acc, type) => {
      acc[type.typeCode] = (type.reasons || []).map((reason: IReasonPqrs) => ({
        id: reason.reasonCode,
        value: capitalizeText(reason.reasonName),
      }));
      return acc;
    },
    {} as Record<string, ISelectOption[]>,
  );

  return { typeOptions, reasonsByType };
};

export { mapTypesAndReasonsApiToEntities };
