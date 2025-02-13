import { IOption } from "@inubekit/inubekit";
import { actionExpirationDM } from "src/model/domains/savings/actionExpirationDM";
import { RequestType } from "src/model/entity/request";
import { getDomains } from "src/services/iclient/domains/getDomains";
import { getActionsExpirationProgrammed } from "src/services/iclient/savings/getActionsExpirationProgrammed";
import { convertDomainToOption } from "src/utils/domains";

const getActionsExpiration = async (
  requestType: RequestType,
  userIdentification: string,
  accessToken: string,
  productId: string,
) => {
  let actionsExpiration: IOption[] = [];
  if (requestType === "newprogrammedsaving") {
    actionsExpiration = await getActionsExpirationProgrammed(
      userIdentification,
      productId,
      accessToken,
    );

    actionsExpiration.push(
      convertDomainToOption(actionExpirationDM.AT_EXPIRATION),
    );
  } else if (requestType === "newcdat") {
    const domains = await getDomains(["actionafterexpiration"], accessToken);

    if (!domains) return actionsExpiration;

    actionsExpiration = domains.actionafterexpiration
      .filter((action) => actionExpirationDM.valueOf(action.id))
      .map((action) => ({
        id: action.id,
        value: action.id,
        label: actionExpirationDM.valueOf(action.id)?.value || "",
      }));
  }

  return actionsExpiration;
};

export { getActionsExpiration };
