import { ISelectOption } from "@design/input/Select/types";
import { actionExpirationDM } from "src/model/domains/savings/actionExpirationDM";

const mapShareApiToEntity = (
  share: Record<string, string | number | object>,
): ISelectOption => {
  return {
    id: String(share.code),
    value: actionExpirationDM.valueOf(String(share.code))?.value || "",
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
