import { IOption } from "@inubekit/inubekit";
import { actionExpirationDM } from "src/model/domains/savings/actionExpirationDM";

const mapActionApiToEntity = (
  action: Record<string, string | number | object>,
): IOption => {
  return {
    id: String(action.code),
    value: String(action.code),
    label: actionExpirationDM.valueOf(String(action.code))?.value || "",
  };
};

const mapActionsApiToEntities = (
  actions: Record<string, string | number | object>[],
): IOption[] => {
  const actionList = Object(actions).actions;
  return Array.isArray(actionList)
    ? actionList
        .map((action) => mapActionApiToEntity(action))
        .filter((action) => !!action.label)
    : [];
};

export { mapActionApiToEntity, mapActionsApiToEntities };
