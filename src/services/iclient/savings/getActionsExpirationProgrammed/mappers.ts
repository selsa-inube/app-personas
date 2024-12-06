import { ISelectOption } from "@design/input/Select/types";
import { actionExpirationDM } from "src/model/domains/savings/actionExpirationDM";

const mapActionApiToEntity = (
  action: Record<string, string | number | object>,
): ISelectOption => {
  return {
    id: String(action.code),
    value: actionExpirationDM.valueOf(String(action.code))?.value || "",
  };
};

const mapActionsApiToEntities = (
  actions: Record<string, string | number | object>[],
): ISelectOption[] => {
  const actionList = Object(actions).actions;
  return Array.isArray(actionList)
    ? actionList.map((action) => mapActionApiToEntity(action))
    : [];
};

export { mapActionApiToEntity, mapActionsApiToEntities };
