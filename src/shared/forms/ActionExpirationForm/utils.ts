import { ISelectOption } from "@design/input/Select/types";
import { actionExpirationDM } from "src/model/domains/savings/actionExpirationDM";
import { RequestType } from "src/model/entity/request";
import { getDomains } from "src/services/iclient/domains/getDomains";
import { getActionsExpirationProgrammed } from "src/services/iclient/savings/getActionsExpirationProgrammed";

const getActionsExpiration = async (
  requestType: RequestType,
  userIdentification: string,
  accessToken: string,
  productId: string,
) => {
  let actionsExpiration: ISelectOption[] = [];
  if (requestType === "newprogrammedsaving") {
    actionsExpiration = await getActionsExpirationProgrammed(
      userIdentification,
      productId,
      accessToken,
    );

    actionsExpiration.push(actionExpirationDM.AT_EXPIRATION);
  } else if (requestType === "newcdat") {
    const domains = await getDomains(["actionafterexpiration"], accessToken);

    if (!domains) return actionsExpiration;

    actionsExpiration = domains.actionafterexpiration
      .filter((action) => actionExpirationDM.valueOf(action.id))
      .map((action) => ({
        id: action.id,
        value: actionExpirationDM.valueOf(action.id)?.value || "",
      }));
  }

  return actionsExpiration;
};

export { getActionsExpiration };
