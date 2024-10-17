import { ISelectOption } from "@design/input/Select/types";
import { capitalizeText } from "src/utils/texts";

const mapDisbursementApiToEntity = (
  disbursement: Record<string, string | number | object>,
): ISelectOption => {
  return {
    id: String(disbursement.value),
    value: capitalizeText(disbursement.name.toString()),
  };
};

const mapDisbursementsApiToEntities = (
  disbursements: Record<string, string | number | object>[],
): ISelectOption[] => {
  return disbursements.map((disbursement) =>
    mapDisbursementApiToEntity(disbursement),
  );
};

export { mapDisbursementApiToEntity, mapDisbursementsApiToEntities };
