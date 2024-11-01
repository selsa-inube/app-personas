import { ISelectOption } from "@design/input/Select/types";
import { shareMaturityDM } from "src/model/domains/savings/shareMaturityDM";

const mapShareApiToEntity = (
  share: Record<string, string | number | object>,
): ISelectOption => {
  return {
    id: String(share.code),
    value: shareMaturityDM.valueOf(String(share.code))?.value || "",
  };
};

const mapSharesApiToEntities = (
  shares: Record<string, string | number | object>[],
): ISelectOption[] => {
  const actions = Object(shares).actions;
  return Array.isArray(actions)
    ? actions.map((share) => mapShareApiToEntity(share))
    : [];
};

export { mapShareApiToEntity, mapSharesApiToEntities };
