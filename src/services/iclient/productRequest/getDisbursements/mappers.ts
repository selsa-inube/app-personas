import { IOption } from "@inubekit/inubekit";
import { capitalizeText } from "src/utils/texts";

const mapDisbursementApiToEntity = (
  disbursement: Record<string, string | number | object>,
): IOption => {
  return {
    id: String(disbursement.value),
    value: String(disbursement.value),
    label: capitalizeText(disbursement.name.toString()),
  };
};

const mapDisbursementsApiToEntities = (
  disbursements: Record<string, string | number | object>[],
): IOption[] => {
  return disbursements.map((disbursement) =>
    mapDisbursementApiToEntity(disbursement),
  );
};

export { mapDisbursementApiToEntity, mapDisbursementsApiToEntities };
